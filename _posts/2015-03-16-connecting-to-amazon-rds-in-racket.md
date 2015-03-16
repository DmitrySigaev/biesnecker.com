---
layout: post
title: Connecting to Amazon RDS over SSL in Racket
image: /public/images/racket_and_balls.jpg
summary: >
    Say, for the sake of argument, that you need to connect to an Amazon RDS instance over SSL from a Racket program. Here's how you do it.
---

If you're connecting to an [Amazon RDS](http://aws.amazon.com/rds/) instance from outside of the Amazon AWS infrastructure you should do so over SSL so that your login credentials can't be sniffed. Doing this, though, adds a bit of complication to the connection process. This post is mostly for my own benefit so that I don't forget, and shows how to connect to a MySQL Amazon RDS instance over SSL using Racket.

### Create an SSL Context

The first step is to create an SSL context that will verify the host's provided certificate against the right public key. The public key for Amazon RDS is [here](https://rds.amazonaws.com/doc/mysql-ssl-ca-cert.pem), and you should pass the path to this file to the following function to create an SSL context that will do the proper verification.

{% highlight racket %}
(require openssl)

; path is the relative filepath to the Amazon-provided RDS PEM
(define (pem->sslcontext path)
  (let ([ctx (ssl-make-client-context 'tls)])                                                                               
    (ssl-load-verify-root-certificates! ctx path)
    (ssl-set-verify! ctx #t)
    (ssl-set-ciphers! 
      ctx 
      "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2")
    (ssl-seal-context! ctx)
    ctx))
{% endhighlight %}

### Create a connection

Next, create a connection object using Racket's [database module](http://docs.racket-lang.org/db/). Make sure that you both enable SSL and pass the SSL context that you made.

{% highlight racket %}
(require db)

(define (mysqldb sslcontext) 
  (mysql-connect
    #:server "example.host.rds.amazonaws.com"
    #:port 3306
    #:database "database_name"
    #:user "username"
    #:password "password"
    #:ssl 'yes
    #:ssl-context sslcontext))

{% endhighlight %}

### Create a connection pool-backed virtual connection

This step is totally optional, but it makes it _really_ easy to just refer to a connection object and let the system sort out which connect to use, etc.

{% highlight racket %}
(define rds-conn
  (virtual-connection
    (connection-pool
      (lambda () (mysqldb (pem->sslcontext "/path/to/the/cert")))
      #:max-idle-connections 3)))
{% endhighlight %}

### And that's it

Pretty straightforward, but I didn't find anything concrete like this while searching, so I thought I'd write it down here for posterity.