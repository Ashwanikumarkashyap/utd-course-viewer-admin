function createElemUtil(parent, id_, class_, type, isPrepend) {
    let parent_elem = document.getElementById(parent);
    let elem;

    switch (type) {
        case "div":
            elem = document.createElement("div");
            break;
        case "p":
            elem = document.createElement("p");
            break;
        case "button":
            elem = document.createElement("button");
            break;
        case "i":
            elem = document.createElement("i");
            break;
        case "input":
            elem = document.createElement("input");
            break;
        case "form":
            elem = document.createElement("form");
        break;
        case "label":
            elem = document.createElement("label");
        break;
        case "span":
            elem = document.createElement("span");
        break;
        default:
            elem = document.createElement("div");
    }

    if (parent_elem != undefined) {
        if (isPrepend) {
            parent_elem.prepend(elem);    
        } else {
            parent_elem.append(elem);    
        }
    }

    elem.setAttribute("id", id_);
    elem.classList.add(class_);
    return elem;
}