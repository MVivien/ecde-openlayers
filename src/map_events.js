let _mapCointainer = null;
const _eventsQueue = [];

export function storeMapReference(element) {
  _mapCointainer = element;
}

export function consumeAllEvents() {
  const length = _eventsQueue.length;
  for (let i = 0; i < length; i++) {
    triggerEvent(_eventsQueue.pop());
  }
}

export function registerEvent(event) {
  if (!_mapCointainer) {
    _eventsQueue.push(event);
    console.debug(
      `map not ready, putting event ${event.type} (detail: ${JSON.stringify(
        event.detail,
      )}) in queue. size is ${_eventsQueue.length}`,
    );
  } else {
    triggerEvent(event);
  }
}

function triggerEvent(event) {
  console.debug(`triggering event ${event.type} with detail: ${JSON.stringify(event.detail)}`);
  _mapCointainer.dispatchEvent(event);
}
