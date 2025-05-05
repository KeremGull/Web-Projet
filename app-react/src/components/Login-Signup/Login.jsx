import "./login.css"
export default function Login({form,setForm,handleFunc}) {
    return (
        <div class="login">
            <form>
                <label for="username">E-mail:</label>
                <input type="email" id="email" name="email" value={form.email} onChange={e => {
                    setForm({...form,email:e.target.value})
                }}></input>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" name="password" value={form.password} onChange={(e) => {
                    setForm({...form,password:e.target.value})
                }}></input>
                <button  onClick={handleFunc}>Login</button>
            </form>
        </div>
    )
}