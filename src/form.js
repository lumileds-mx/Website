const btn = document.getElementById('submit-btn');
const sendText = document.getElementById('send-text');
const checkmark = document.getElementById('checkmark');
const spinner = document.getElementById('loading-spinner');
const error_elem = document.getElementById('error');
const ftool = document.getElementById('form-tooltip');

function error_form(message, form) {
    spinner.classList.add('hidden');
    error_elem.classList.remove('hidden');
    ftool.innerHTML = message;
    ftool.style.opacity = 1;
    ftool.style.visibility = "visible";
    ftool.style.top = "130%";
    btn.style.backgroundColor = "#D72638";
    setTimeout(() => {
        btn.style.width = "12rem";
        setTimeout(() => {
            error_elem.classList.add('hidden');
            sendText.classList.remove('hidden');
            ftool.style.opacity = 0;
            ftool.style.visibility = "hidden";
            ftool.style.top = "100%";
            btn.style.backgroundColor = "#f9af08";
            btn.disabled = false;
        }, 300);
    }, 3000); // Reset after 3 seconds
}

function success(form) {
    spinner.classList.add('hidden');
    checkmark.classList.remove('hidden');
    btn.style.backgroundColor = "#4DAA57";
    setTimeout(() => {
        btn.style.width = "12rem";
        setTimeout(() => {
            checkmark.classList.add('hidden');
            sendText.classList.remove('hidden');
            form.reset();
            btn.style.backgroundColor = "#f9af08";
            btn.disabled = false;
        }, 300);
    }, 1000); // Reset after 1 second
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (!emailRegex.test(email)) {
        throw new Error("El correo no es valido.");
    }
    return true; // Email is valid
}

function validateString(input, min_length) {
    if (input.trim() === "") {
        throw new Error("Favor de rellenar todos los campos.");
    }
    if (input.length < min_length) {
        throw new Error("Nombre o mensaje muy corto");
    }
    return true; // String is valid
}

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    sendText.classList.add('hidden');
    spinner.classList.remove('hidden');
    btn.disabled = true;
    btn.style.width = "4rem";

    const form = e.target;
    const formData = new FormData(form);

    // Convert FormData to JSON
    const data = Object.fromEntries(formData.entries());
    console.log(data.name);

    

    try {
        validateString(data.name, 3);
        validateEmail(data.email);
        validateString(data.message, 10);
        // const response = await fetch(form.action, {
        //     method: form.method,
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // });

        if (Math.random() > 0.5) {
            success(form);
        } else {
            msg = "Hubo un problema!<br> Intente de nuevo en unas horas";
            error_form(msg);
        }
    } catch (error) {
        // console.error('Submission failed:', error);
        // console.log(error);
        error_form(error);
    }
});
