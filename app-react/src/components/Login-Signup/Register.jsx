import React from 'react'

function Register({form,setForm,handleFunc}) {
    
  return(
    <div>
    <label htmlFor="nom">Nom:</label>
    <input type="text" id="nom" name="nom" required value={form.nom} onChange={e => {
        setForm({...form,nom:e.target.value})
    }}/>
  
    <label htmlFor="prenom">Prenom:</label>
    <input type="text" id="prenom" name="prenom" required value={form.prenom} onChange={e => {
        setForm({...form,prenom:e.target.value})
    }} />
  
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" required value={form.email} onChange={e=>{
        setForm({...form,email:e.target.value})
    }}/>
  
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" required value={form.password} onChange={e=>{
        setForm({...form,password:e.target.value})  
    }}/>
  
    <label htmlFor="password2">Confirm Password:</label>
    <input type="password" id="password2" name="password2" required value={form.password2} onChange={e=>{
        setForm({...form,password2:e.target.value})
    }}/>
  
    <label htmlFor="dateDeNaissance">Date de Naissance:</label>
    <input type="date" id="dateDeNaissance" name="dateDeNaissance" required value={form.date_naissance} onChange={e=>{
        setForm({...form,date_naissance:e.target.value})
    }}/>
  
  <button type="submit" onClick={handleFunc}>Register</button>
    </div>
  )
    

}

export default Register