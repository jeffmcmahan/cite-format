# Cite Format
Cite Format is an intuitive way of accurately and exhaustively describing the arrangement of source information into citations. Here's an example APA-like book format:
```
^AUTHOR|EDITOR. (YEAR). <i>TITLE</i> (Translated+by+TRANSLATOR) . EDITOR. LOCATION: PUBLISHER.
```

This defines output citations of the form:

* Chomsky, Noam. (1965). *Aspects of the theory of syntax.* Cambridge, MA: MIT Press.
* Nietzsche, Friedrich. (1969). *Genealogy of Morals* (Translated by Walter Kaufmann). Random House.

## Syntax
There are 5 syntactic categories:

1. **boundaries**: spaces ( ` ` ) and backslashes ( `\` )
1. **modifiers**: carets ( `^` ) and bar ( `|` )
1. **fields**: uppercase strings of 3+ uppercase letters ( `AUTHOR` ), plus modifiers
1. **punctuation**: any combination of: `,.:[]()"'`
1. **extras**: arbitrary strings, with whitespace represented by plus ( `+` ) symbols

With these concepts in hand, we frame 3 rules of composition:

1. If no boundary intervenes among *N* elements, they're *attached*.
1. Fields do not attach to one other.
1. Modifiers must attach to a field.

### On attachment
An element is said to be ***attached*** to a field if no boundaries intervene between the field and the element. In the below, the extras (HTML tags) and the punctuation are attached to the TITLE field:

```
<i>(TITLE).</i>
```

In the next case, the parentheses attach to the ISSUE field, and not to the VOLUME or PAGENUMBERS fields, since a backslash (a boundary) intervenes on the left, and a space (a boundary) intervenes on the right.

```
VOLUME\(ISSUE). PAGENUMBERS.
```

## Semantics
### Field interpolation and modifiers
Fields are replaced with strings; `AUTHOR` becomes *Noam Chomsky.*

The **bar** modifier turns *n* fields into a single disjoint field, in which the leftmost non-empty value replaces the whole field. So `AUTHOR|EDITOR` will be replaced by the value of `AUTHOR` if defined, or else with the value of `EDITOR`.

If a **caret** appears at the left edge of a name field<sup>&dagger;</sup>, the (alphabetically) first name will appear inverted. So, `^AUTHOR` becomes *Chomsky, Noam.*

<sub>
&dagger; Name fields are: AUTHOR(S), EDITOR(S), TRANSLATOR(S), CONTRIBUTOR(S), DIRECTOR(S), COMPOSER(S), and PERFORMER(S).
</sub>

### Attachment
Elements attached to an empty field are dropped. So then, if FIELDA evaluates as 'Chomsky', and FIELDB evaluates as empty:

```py
# Attached period
FIELDA FIELDB.  # = 'Chomsky'

# Un-attached period
FIELDA FIELDB . # = 'Chomsky.'
```
In the first case, the attached period vanishes because FIELDB is empty, while in the second case, the un-attached period remains. The same applies for extras.

## Punctuation filters
The output will satisfy the following:
* Empty enclosing punctuation ( `"" '' () []` ) is dropped.
* Bad periods ( `..   (.   [.` ) are dropped.
* Bad commas ( `,,   ,.   (,   [,   :,   ,)   ,]` ) are dropped.
* Bad colons ( `::  :.   (:   [:   ,:   :)   :]` ) are dropped.
