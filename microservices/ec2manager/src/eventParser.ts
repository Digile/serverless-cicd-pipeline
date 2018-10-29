export function parseEvent(event) {

  return {
    DryRun: true,
    InstanceIds: event.instanceIds ? event.instanceIds : [],
  };
}
