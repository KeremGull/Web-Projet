export function validateRegister(form){
    if (!form.nom || !form.prenom || !form.date_naissance || !form.email || !form.password || !form.password2){
        alert("All fields must be filled")
        return false
    }else if (!/^[a-zA-Z]+$/.test(form.nom)) {
        alert("Nom must contain only letters");
    }else if (!/^[a-zA-Z]+$/.test(form.prenom)) {
        alert("Prenom must contain only letters");
    }else if (!/\S+@\S+\.\S+/.test(form.email)) {
        alert("Email is not valid");
    }else if (form.password.length < 8) {
        alert("Password must be at least 8 characters");
    }else if (form.password!=form.password2){
        alert("Passwords do not match")
    }else if (new Date(form.date_naissance) > new Date()) {
        alert("Date de naissance cannot be in the future");
    }else{
        return true
    }

    return false
    
}
export function validateLogin(form){
    if (!form.email || !form.password) {
        alert("All fields must be filled out");
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        alert("Email is not valid");
    }else{
        return true
    }
    return false
}
