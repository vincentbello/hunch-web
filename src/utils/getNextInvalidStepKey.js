// @flow
import { NUM_STEPS, STEP_SEQUENCE } from 'constants/create-hunch';
import type { CreationState } from 'contexts/HunchCreationContext';

const incrementIndex = (index: number): number => index === NUM_STEPS - 1 ? 0 : index + 1;

export default function getNextInvalidStepKey(activeStepIndex: number, creationState: CreationState): string {
  const activeStep = STEP_SEQUENCE[activeStepIndex];

  let index = incrementIndex(activeStepIndex);
  while (index !== activeStepIndex) {
    const step = STEP_SEQUENCE[index];
    if (!step.validate(creationState)) return step.key;

    index = incrementIndex(index);
  }

  return activeStep.key;
}
