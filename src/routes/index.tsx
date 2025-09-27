import type { DocumentHead } from "@qwik.dev/router";
import { component$, Slot, useComputed$, useSignal } from "@qwik.dev/core";

type Props = {
    disabled?: boolean;
};

const Button = component$<Props>(({ disabled = false }) => {
    return (
        <div
          class={{
            'shadow-transparent bg-background-700 text-surface-200': disabled,
            'text-background-500 button-shadow bg-surface-500 font-bold': !disabled,
          }}
            >
            <button
                disabled={disabled}
            >
                <Slot />
            </button>
        </div>
    );
});


export default component$(() => {
  const someState = useSignal({
    'state': 'disabled'
  })
  const shouldBeDisabled = useComputed$(() => someState.value.state === 'disabled')
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        <span>Current state: {someState.value.state}</span>
        <br />
        <button
          onClick$={() => someState.value = {
            'state': someState.value.state === 'disabled' ? 'not disabled' : 'disabled'
          }}
        >toggle</button>

        <Button
          disabled={shouldBeDisabled.value}
        >
          Button being disabled
        </Button>
        Happy coding.
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
