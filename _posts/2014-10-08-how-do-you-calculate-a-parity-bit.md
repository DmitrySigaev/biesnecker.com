---
layout: post
title: How do you calculate a parity bit?
image: /public/images/binary.jpg
summary: >
    Calculating the parity bit for binary data is one of the simplest checks of data integrity you can do, and it's the sort of question that sometimes appears on technical interviews, so you should know how to do it. It's easy, and it builds on work in previous posts with logic gates and bitwise operations.
---

If you're sending a bunch of data over the wire, how do you make sure that what you receive is actually what you sent, and that random interference or connectivity failures didn't mess things up? There are many ways, but one of the simplest is to add a parity bit to the end of the data when it is sent, and then on the receiving side check to see if the parity bit generated from the recieved data matches.

### What is parity?

The parity of a string of binary data indicates whether the number of set bits in the string is odd or even. There are two kinds of parity (because of course there are) -- *even parity* and *odd parity*. In *even parity* the parity bit is 1 if the number of 1s in the binary string is *odd*, thereby making the number of 1s in the full binary string *even*. In *odd parity* the parity bit is 1 if the number of 1s in the binary string is *even*, thereby making the number of 1s in the full binary string *odd*. They're functionally equivalent, so in the below examples I'm going to use *even parity* exclusively to keep things simple.

### Calculating the parity bit

To reframe the problem, we need a way to toggle a bit back and forth between 1 and 0 every time a 1 is encountered in a binary string. Going back to my [previous post on bit manipulations](/2014/10/05/a-gentle-introduction-to-binary-logic/), XOR is used to toggle the value of a bit. Maybe that would work here?

Let's work through it by hand, starting with the binary string 0x110111 and a parity value of 0:

1. Bit: 1. Parity: 1 XOR 0 = 1. Remaining: 0x11011.
2. Bit: 1. Parity: 1 XOR 1 = 0. Remaining: 0x1101.
3. Bit: 1. Parity: 0 XOR 1 = 1. Remaining: 0x110.
4. Bit: 0. Parity: 1 XOR 0 = 1. Remaining: 0x11.
5. Bit: 1. Parity: 1 XOR 1 = 0. Remaining: 0x1.
6. Bit: 1. Parity: 0 XOR 1 = 1. DONE.

Did that work? Looks like it -- there are five 1s in 0x110111, and the parity bit is 1, which would make the total number of 1s in the binary data string six, thereby fulfilling the parity bit's role.

If this example didn't make sense, let's look at XOR's truth table:

<table>
    <thead>
        <tr>
            <th>P</th><th>Q</th><th>P &oplus; Q</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>T</td><td>T</td><td>F</td>
        </tr>
        <tr>
            <td>T</td><td>F</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>T</td><td>T</td>
        </tr>
        <tr>
            <td>F</td><td>F</td><td>F</td>
        </tr>
    </tbody>
</table>

The parity bit starts at 0. Any 0s it encounters won't change it, because 0 &oplus; 0 = 0. The first 1, however, flips it to one, because 0 &oplus; 1 = 1. At this point, if it encounters more 0s, then it won't be changed, either, because 1 &oplus; 0 = 1, too. Finally, if it encounters another 1 it will flip back to 0, as 1 &oplus; 1 = 0.

And now for the Python. I'm using the pretty fantastic [BitString](https://pythonhosted.org/bitstring/) module to represent the binary data I'm using as an example.

{% highlight python %}
from bitstring import Bits

def parity(bytestring):
    p = 0
    b = Bits(bytes=bytestring)

    for bit in b:
        p ^= int(bit)

    return p

# 01010000011000010111001001101001
# 0111010001111001
parity('Parity')
#=> 0

# 01000010011010010111010001101100
# 01101111011101100110010101110010
parity('Bitlover')
#=> 1
{% endhighlight %}

### Conclusion

Creating a parity bit (or checking of a parity bit that you've received matches the data that came with it) is not hard at all, and as I said in the introduction, is the sort of thing that comes up in programming interviews from time to time. Now you know it's just a simple XOR, and you'll be prepared if you ever need to use it in anger.
