export const responseAction = (name, method, data) => {
  const actions = {
    // Example
    name: {
      method: () => {},
    },
    // Event
    events: {
      post: () => {
        window.location.replace(`/dashboard/events/${data.newDoc._id}/edit`);
      },
      delete: () => {
        document.querySelector(`[data-id="${data.deletedDoc._id}"]`).remove();
      },
      save_and_add_new: () => {
        window.location.replace("/dashboard/events/new");
      },
    },
  };

  if (actions[name] && actions[name][method]) {
    actions[name][method]();
  } else {
    // Default action or error handling
  }
};
