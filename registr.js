const form = document.getElementById("form");

form.addEventListener("submit", (event) => {  
    event.preventDefault();
    const userName = document.getElementById("name").value;
    const user = {
        id: Date.now(),
        name: userName        
    };

    localStorage.setItem("user", JSON.stringify(user));
});
