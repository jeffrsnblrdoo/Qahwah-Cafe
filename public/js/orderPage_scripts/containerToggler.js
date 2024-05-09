//display togglers
export const containerToggler = (container, mode) => {
    switch(mode) {
        case "flex":
            container.style.display = "flex";
            break;
        case "block":
            container.style.display = "block";
            break;
        case "none":
            container.style.display = "none";
            break;
        default:
            console.error("Invalid display mode:", mode);
            break;
    }
}