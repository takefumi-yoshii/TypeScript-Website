// Without a background in type theory, you're unlikely
// to be familiar with the idea of a type system being "sound"

// Soundness is the idea that the compiler can make guarantees
// about what types are available at runtime, and not just
// during compilation. This is normal for most programming
// languages are built with types from day one.

// Building a type system after the language has existed for
// a few decades however becomes about trade-offs with
// three qualities: Simplicity, Usability and Soundness.

// With the goal of being able to support all JavaScript
// code, TypeScript tends towards simplicity and usability
// when presented with ways to add types to JavaScript.

// Let's look at a few cases where TypeScript is provably
// not sound, to understand what those trade-offs would look
// like otherwise.

// Type Assertions

const usersAge = ("23" as any) as number;

// TypeScript will let you use type assertions to override
// the inference to something which is is quite wrong. Using
// type assertions is a way of telling TypeScript you know
// best, and TypeScript will try to let you get on with it.

// Function Parameter Bi-variance

// Params for a function support redefining the parameter
// to be a subtype of the original declaration.

interface InputEvent {
  timestamp: number;
}
interface MouseInputEvent extends InputEvent {
  x: number;
  y: number;
}
interface KeyboardInputEvent extends InputEvent {
  keyCode: number;
}

function listenForEvent(eventType: "keyboard" | "mouse", handler: (event: InputEvent) => void) {}

// You can re-declare the parameter type to be a subtype of
// the declaration. Above, handler expected a type InputEvent
// but in the below usage examples - TypeScript accepts
// a type which has additional properties.

listenForEvent("keyboard", (event: KeyboardInputEvent) => {});
listenForEvent("mouse", (event: MouseInputEvent) => {});

// This can go all the way back to the smallest common type:

listenForEvent("mouse", (event: {}) => {});

// But no further:

listenForEvent("mouse", (event: string) => {});

// This covers the real-world pattern of event listener
// in JavaScript, at the expense of having being sound.

// You could work around this particular case with function
// overloads, see: example:typing-functions

// Parameter Discarding

// To learn about special cases with function parameters
// see example:structural-typing

// Rest Parameters

// Rest parameters are assumed to all be optional, this means
// TypeScript will not have a way to enforce the number of
// parameters available to a callback.

function getRandomNumbers(count: number, callback: (...args: number[]) => void) {}

getRandomNumbers(2, (first, second) => console.log([first, second]));
getRandomNumbers(400, first => console.log(first));

//

// type compatibility link

// https://github.com/Microsoft/TypeScript/issues/9825