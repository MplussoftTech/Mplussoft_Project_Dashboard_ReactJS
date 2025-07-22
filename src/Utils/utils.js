export const renderStatus = (resStatus) => {
  switch (resStatus) {
    case "on_going":
      return "Ongoing";
    case "on_board":
      return "Onboarding";
    case "complete":
      return "Completed";
    case "on_hold":
      return "Hold";
    case "cancel":
      return "Cancel";

    default:
      break;
  }
};


