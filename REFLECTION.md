Name: Alyssa O'Keefe
Test 2 Reflection

Q1 — Props
A prop is a piece of data passed from a parent component to a child component so the child can display or use that value. In Vue, data flow is one-way, meaning data moves downward from parent to child rather than upward. We pass the current question from the store through the parent instead of importing useGameStore directly inside QuestionCard because QuestionCard is a presentational component and should focus only on displaying data, not managing or owning application state. Using props keeps the component more reusable, easier to test, and less tightly coupled to the store.

Q2 — $emit
$emit is used by a child component to send a custom event upward to its parent, usually to report that something happened, such as the user clicking an answer. The parent listens for that event by adding an event listener in the template, such as @answer-selected="handleAnswer". This allows the child to stay simple while the parent decides what action to take. If the emitted event is not handled in the parent, the click will not trigger the intended logic, so nothing meaningful will happen beyond the button press itself.

Q3 — Pinia store
When currentIndex, score, and gameState all live in App.vue, that component owns the state, meaning it is responsible for storing and updating the data. As the component tree grows, this causes prop drilling, where data and event handlers must be passed through multiple layers of components even when some intermediate components do not actually need them. That makes the app harder to maintain and more fragile. Moving shared state into a Pinia store solves this by giving multiple components direct access to the same centralized state without forcing everything through one parent component.

Q4 — Vue Router
A traditional multi-page website loads a completely new HTML page from the server each time the user navigates, while a Single-Page Application loads one main page and then updates the visible content dynamically in the browser. <router-view> is the placeholder where Vue Router renders the component that matches the current route. Navigating between routes does not reload the page because Vue Router intercepts navigation and swaps components client-side using JavaScript. This creates a faster and smoother user experience.

Q5 — v-if vs v-show
v-if conditionally adds or removes an element from the DOM, while v-show keeps the element in the DOM and only toggles its CSS display property. v-if is the better choice for switching between game screens because only the active screen should actually exist at that moment. This avoids keeping inactive screens mounted unnecessarily and ensures their logic and elements are removed when not in use. In contrast, v-show would hide the screens visually but still keep them loaded in the DOM.