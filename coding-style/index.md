---
title: Coding Style Guidelines
layout: default
---

# Code Style Guidelines v2
## Disclaimer
A few things I should point out right now:
1. This is designed for the C language. The being said, however, I do usually apply these rules to other languages as well. At the end of this document is some exceptions for other languages.
2. These are my personal preferences. This is not here to start arguments and I'll admit some of the rules aren't exactly that smart and are here for other reasons.
3. I'm happy using whatever coding style other projects use when I'm working on them, this is just here to give my own code a bit more consistency and for others who want to help with my code.
4. These rules may also change in the future as my opinions change.
5. This is based on the [Webkit Style Guidelines](https://webkit.org/code-style-guidelines).

---

## Contents
- [V2 Differences](#v2-differences)
- [Indentation](#indentation)
- [Spacing](#spacing)
- [Line breaking](#line-breaking)
- [Braces](#braces)
- [Values and Types](#values-and-types)
- [Names](#names)
- [File Structure](#file-structure)
- [Misc.](#misc)
- [Lua differences](#lua-differences)
- [TypeScript differences](#typescript-differences)
- [C++ differences](#c-differences)

## V2 Differences

I now use tabs instead of spaces. I still think tabs are great however the lack of support for them started to bug me. Along with this it allowed me to have more control over the style since it wasn't dependent on users customization. I use 3 space tabs cause 3 is a *kool number* unlike the silly 4.

---

Along with the weird 3 space tabs, I now also have 90 character line limits. This allows for a bit more room (along with smaller tabs) and is exactly 30 tabs.

---

I now have a way to break up function definitions that I find neat. It is very similar to the way function calls are broken up.

---

I have decided to always use `<stdbool.h>` over `_Bool`.

---

I have removed the rule that all static functions must always have only two words since, I'll be honest, that was a stupid rule. However, they should still have *atleast* two words.

---

Since I have started programming in TypeScript, I have also added some differences for that language.

---

## Indentation

Use spaces, not tabs. The tab width is 3 spaces.
### Right
```c
int main() {
   return 0;
}
```
#### Wrong
```c
int main() {
	// This person is using spaces
	return 0;
}

int main() {
    // This person is using 4 spaces
    return 0;
}
```
---

Do not try to align the start of lines when a statement goes over multiple lines. Instead just use a single extra tab, this will be covered in more detail later.
### Right
```c
some_function(
   some_arg1,
   some_arg2,
   some_arg3
);
```
#### Wrong
```c
some_function(
              some_arg1,
              some_arg2,
              some_arg3
);
```
---

Indent both case labels and switch statements relative to the line above.
### Right
```c
switch (value) {
   case 0:
      // do something
      break;
   case 1:
      // do something else
      break;
   default:
      // do something different
      break;
}
```
#### Wrong
```c
switch (value) {
case 0:
   // do something
   break;
case 1:
   // do something else
   break;
default:
   // do something different
   break;
}
```
---

## Spacing

Do not place spaces around unary operators.
### Right
```c
*(array++) = 0;
--size;
```
#### Wrong
```c
*(array ++ ) = 0;
-- size;
```
---

Place a single space around binary operators.
### Right
```c
int index = y * width + x;
```
#### Wrong
```c
int index=y*width+x;
```
---

Do not place spaces around access operators.
### Right
```c
object.value = 3;
ptr->value = 5;
```
#### Wrong
```c
object . value = 3;
ptr -> value = 5;
```
---

Do not place spaces before commas and semicolons.
### Right
```c
for (int i = 0; i < size; ++i) {
   some_function(i, size);
}
```
#### Wrong
```c
for (int i = 0 ; i < size ; ++i) {
   some_function(i , size) ;
}
```
---

Do not place spaces inbetween parantheses. However, place a single space after parantheses and before code blocks.
### Right
```c
if (value == 0) {
   // do something
}
```
#### Wrong
```c
if ( value == 0 ){
   // do something
}
```
---

Place a single space between control statements and their parentheses.
#### Wrong
```c
if(value == 0) {
   // do something
}
```
---

Do not place spaces between a function and its parantheses.
### Right
```c
void some_function(int arg1, int arg2, int arg3) {
   // do something
}

some_function(arg1, arg2, arg3);
```
#### Wrong
```c
void some_function (int arg1, int arg2, int arg3) {
   // do something
}

some_function (arg1, arg2, arg3);
```
---

Do not place spaces inbetween object constructors.
### Right
```c
mytype_t value = {arg1, arg2, arg3};
```
#### Wrong
```c
mytype_t value = { arg1, arg2, arg3 };
```
---

## Line breaking

Each statement should get its own line.
### Right
```c
int half_width = width / 2;
int half_height = height / 2;
if (half_width > half_height) {
   half_width /= 2;
}
```
#### Wrong
```c
int half_width = width / 2, half_height = height / 2;
if (half_width > half_height) half_width /= 2;
```
---

**Exception:** If you have multiple variables of the same type with no initializes, they can go on the same line. This is not required though.
### Right
```c
int width, height;

int x;
int y;
```
#### Wrong
```c
int width = 1280, height = 720;
int x; double y;
```
---

Add blank lines above and below function definitions.
### Right
```c
int some_variable;

void some_function1() {
   // do something
}

void some_function2() {
   // do something else
}
```
#### Wrong
```c
int some_variable;
void some_function1() {
   // do something
}
void some_function2() {
   // do something else
}
```
---

Blank lines should also be used to seperate parts of a function to make the code more clear.
### Right
```c
int max = 0;
for (int i = 0; i < size; ++i) {
   if (array[i] > max) {
      max = array[i];
   }
}

if (max > g_max) {
   puts("New global max found!");
   g_max = max;
}
```
#### Wrong
```c
int max = 0;
for (int i = 0; i < size; ++i) {
   if (array[i] > max) {
      max = array[i];
   }
}
if (max > g_max) {
   puts("New global max found!");
   g_max = max;
}
```
---

Lines longer than 90 characters should be split up to be under 80 characters.

---

`for` loops longer than 90 characters should have its initializer taken out.
### Right
```c
linked_node_t* node = some_long_object->list;
for (; node != NULL; node = node->next) {

}
```
---

Function calls longer than 90 characters should have its arguments over multiple lines. You can have multiple arguments on the same line if they match up. You can have arguments on the initial line if its the priority argument that all other arguments are referring to. The final parantheses should be on a new line.
### Right
```c
some_function(
   arg1,
   arg2,
   arg3
);

some_function(
   key1, name1,
   key2, name2,
   key3, name3
);

some_function(priority,
   arg1,
   arg2,
   arg3
);
```
#### Wrong
```c
some_function(
   arg1, unrelated_arg2,
   arg3
);

some_function(non_important_arg1
   arg2,
   arg3
);

some_function(
   arg1,
   arg2,
   arg3);
```
---

Funcition over 90 characters definitions should be broken up in a similar fassion to function calls.
### Right
```c
void some_function(
   arg1,
   arg2,
   arg3
) {
   // function definition
}

void some_function(
   key1, name1,
   key2, name2,
   key3, name3
) {
   // function definition
}

void some_function(priority,
   arg1,
   arg2,
   arg3
) {
   // function definition
}
```
#### Wrong
```c
void some_function(
   arg1, unrelated_arg2,
   arg3
) {
   // function definition
}

void some_function(non_important_arg1
   arg2,
   arg3
) {
   // function definition
}

void some_function(
   arg1,
   arg2,
   arg3) {
   // function definition
}
```
---

Operations longer than 90 characters should be split over multiple lines with each line starting with the operator.
### Right
```c
int value = arg1
   + arg2
   + arg3;

// or optionally
int value
   = arg1
   + arg2
   + arg3;
```
#### Wrong
```c
int value = arg1 +
   arg2 +
   arg3;

int value =
   arg1 +
   arg2 +
   arg3;
```
---

## Braces

Place the open brace on the same line, place the close brace on a new line.
### Right
```c
int main() {
   if (value == 0) {
      do_something();
   }
}
```
#### Wrong
```c
int main()
{
   if (value == 0) {
      do_something(); }
}
```
---

Do not use one-line control statements without braces.
### Right
```c
if (value == 0) {
   do_something();
}
```
#### Wrong
```c
if (value == 0)
   do_something();

if (value == 0) do_something();
```
---

**Exception:** Do not add empty braces if there is no code.
### Right
```c
while (getchar() != '\n');
```
#### Wrong
```c
while (getchar() != '\n') {}

while (getchar() != '\n') {
}
```
---

## Values and Types

The null pointer should always be written as `NULL`.
### Right
```c
void* ptr = NULL;
```
#### Wrong
```c
void* ptr = 0;
```
---

For booleans, use `bool`, `true` and `false` (`stdbool.h`).

---

Tests for true/false should be done without equality comparisons.
### Right
```c
if (condition) {
   // do something
}
```
#### Wrong
```c
if (condition == true) {
   // do something
}
```
---

Tests for null or zero should be done with equality comparisons. This is to differentiate a function that would return false on error:
```c
if (!do_something()) {
   // error
}
```
from a function that would return non-zero on error (error code):
```c
if (do_something()) {
   // error?
}
```

### Right
```c
if (ptr == NULL) {
   // do something
}

if (value == 0) {
   // do something else
}
```
#### Wrong
```c
if (ptr) {
   // do something
}

if (value) {
   // do something else
}
```
---

Do not append `.0`, `.f` and `.0f` to floating point literals unless required.
### Right
```c
float x = 2;
float y = 1 / 3.0;
```
#### Wrong
```c
float x = 2.0;
float y = 1 / 3;
```
---

Every value should be initialised before standard use. This includes globals.
### Right
```c
static int x = 0;

int main() {
   int y;
   init_value(&y);
}
```
#### Wrong
```c
static int x;

int main() {
   int y;
}
```
---

When using numbers, only use:
- `int`
- `unsigned` (without `int`)
- `char` (only for strings)
- `float`
- `double`
- `int*_t` types (`stdint.h`)
### Right
```c
int8_t small_value;
int64_t large_value;
int size = sizeof(int);
unsigned gl_buffer;
```
#### Wrong
```c
signed char small_value;
long long large_value;
size_t size = sizeof(int);
GLuint gl_buffer;
```
---

When using pointers, the `*` should be beside the type. Because of this, do not put multiple pointer definitions on the same line.
### Right
```c
void* ptr1;
void* ptr2;
void* ptr3;
```
#### Wrong
```c
void *ptr1;
void* ptr2, ptr3;
```
---

## Names

Use snake_case.
### Right
```c
int some_value;
```
#### Wrong
```c
int someValue;
```
---

Types should be suffixed with `_t`. There should be no difference between the `struct` and `typedef` versions of a type.
### Right
```c
typedef struct my_object_t {
   // values
} my_object_t;

my_object_t object;
```
#### Wrong
```c
typedef struct my_object_s {
   // values
} my_object;

my_object object;
```
---

Exported functions should be named `namespace_group_action`. Static functions should be named `group_action`. If an exported group has a single action (or a single action has no group), you can use two words. A static function must have at least two words.
### Right
```c
static void object_dance(my_object_t* object);

void my_object_create(my_object_t* object);
```
#### Wrong
```c
static void dance(my_object_t* object);

void object_create(my_object_t* object);
```
---

Global static variables should be prefixed with `g_`. There should be no global exported variables.
### Right
```c
static int g_variable;
```
#### Wrong
```c
static int variable;

int g_global;
```
---

Macros should be in all caps and follow the same naming convention as functions.
### Right
```c
#define MY_OBJECT_CONSTANT 5
#define MY_OBJECT_LOG(msg) puts(__FILE__ ": " msg)
```
#### Wrong
```c
#define my_object_constant 5
#define OBJECT_LOG(msg) puts(__FILE__ ": " msg)
```
---

Name header guard macros as `NAMESPACE_FILE_H_`.
### Right
```c
#ifndef MY_OBJECT_H_
#define MY_OBJECT_H_

// do something

#endif
```
#### Wrong
```c
#ifndef object_h
#define object_h

// do something

#endif
```
---

Variable names should be short, quick and easy to write. Abbreviation is allowed and encouraged as long as it is still clear what the variable does.
### Right
```c
int len;
```
#### Wrong
```c
int length_of_array; // too long
int l; // too vague
```
---

## File Structure

The usual file structure for headers is:
- Include guard
- Local includes
- System includes
- Macro constants
- Types
- Functions
- Macro functions
- Include guard `#endif`

however, these can be reordered if required (eg. an include requires a macro).

---

The usual file structure for source files is:
- Primary header if it exists
- Local includes
- System includes
- Macro constants
- Types
- Static globals
- Static functions
- Exported function implementations

---

## Misc.

There shouldn't be comments unless absolutely necessary.
### Right
```c
int i = 3 + 5;
```
#### Wrong
```c
// this adds 3 and 5
int i = 3 + 5;
```
---

**Exception:** `TODO:` comments are allowed.
### Right
```c
if (!some_function()) {
   // TODO: handle error
}
```
---

Only use post-increment if necessary.
### Right
```c
*(array++) = 0;
--size;
```
#### Wrong
```c
*(++array) = 0;
size--;
```
---

Do not use ternary operators.
### Right
```c
int size = 0;
if (array != NULL) {
   size = array->size;
}
```
#### Wrong
```c
int size = array != NULL ? array->size : 0;
```
---

Only use macro functions if necessary.
### Right
```c
int add_one(int value);
```
#### Wrong
```c
#define ADD_ONE(value) ((value) + 1)
```
---

Do not use inline functions.
#### Wrong
```c
static inline int add_one(int value) {
   return value + 1;
}
```
---

## Lua differences

Use single quotes for strings. This is the same for any language that allows single quote strings.
### Right
```lua
local name = 'Joshua Minter'
```
#### Wrong
```lua
local name = "Joshua Minter"
```
---

Use camelCase for classes and functions. Classes should start with a capital letter. Variables still use snake_case. This is the same for any language that has classes.
### Right
```lua
local Object = require('classic')

local my_object = Object:extend()

function doSomething()
   -- do something
end
```
#### Wrong
```lua
local object = require('classic')

local myObject = Object:extend()

function do_something()
   -- do something
end
```
---

Always use local variables. For globals, define them as local at a global scope rather than defining them as global from a local scope. This is the same for any language that does not require defining variables.
### Right
```lua
local x = 3

function someFunction()
   local y = 5
end
```
#### Wrong
```lua
function someFunction()
   x = 3
   y = 5
end
```
---

## TypeScript Differences

Along with all the lua-specific rules, the following also apply to TypeScript.

Always use semicolons.
### Right
```ts
let x = 5;
```
#### Wrong
```ts
let x = 5
```
---

Have a single space after a `:` and before a type, but not before the `:`.
### Right
```ts
let x: number;
```
#### Wrong
```ts
let x:number;
let x : number;
```
---

Only use backtick quotes if necessary (multiline string or inserts).
### Right
```ts
let x = `Multi
line
string`;

let y = `x = '${x}'`;
let z = 'Hello, World!';
```
#### Wrong
```ts
let z = `Hello, World!`; // back-ticks not required here
```
---

Add type to a definition when the type can't be completely inferred from the definition *alone*.
### Right
```ts
let x: number;

let y: number;
y = 5;
```
#### Wrong
```ts
let x;

let y; // The type can't be inferred by this line alone
y = 5;
```
---

The same applies for function parameter and return types.
### Right
```ts
function foobar(x: number, y: string): boolean {
   // do stuff...
}
```
#### Wrong
```ts
function foobar(x, y) {
   // do stuff...
}
```
---

**Exception:** don't add the return type if it is `void`.
### Right
```ts
function foobar(x: number, y: string) {
   // never returns
}
```
#### Wrong
```ts
function foobar(x: number, y: string): void {
   // never returns
}
```
---

## C++ differences

Just... don't.
### Right
```c++
extern "C" {

// write in C code

}
```
#### Wrong
```c++
// write in C++ code
```
---