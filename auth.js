/* Interface preview only. No credentials are transmitted, persisted or authenticated. */
(()=>{'use strict';
const $=id=>document.getElementById(id),form=$('auth-form'),signup=document.body.dataset.auth==='signup';
let reset=false;
function error(id,message){$(id).setAttribute('aria-invalid',String(!!message));$(id+'-error').textContent=message;return !message;}
function clear(){for(const id of ['name','organisation','email','password'])if($(id))error(id,'');$('auth-status').textContent='';}
function hidePassword(){$('password').type='password';$('password-toggle').textContent='Show';$('password-toggle').setAttribute('aria-pressed','false');}
$('password-toggle').onclick=()=>{const showing=$('password').type==='password';$('password').type=showing?'text':'password';$('password-toggle').textContent=showing?'Hide':'Show';$('password-toggle').setAttribute('aria-pressed',String(showing));};
if(signup){for(const radio of document.querySelectorAll('[name="kind"]'))radio.addEventListener('change',()=>{const corporate=document.querySelector('[name="kind"]:checked').value==='corporate';$('organisation-field').hidden=!corporate;$('organisation').disabled=!corporate;$('organisation').required=corporate;error('organisation','');});}
function route(){if(signup)return;reset=location.hash==='#reset';clear();hidePassword();$('password').value='';$('password-field').hidden=reset;$('password').disabled=reset;$('password').required=!reset;$('auth-title').textContent=reset?'Let’s get you back in.':'Welcome back.';$('auth-description').textContent=reset?'Enter the email address associated with your account.':'Pick up where your last planting plan left off.';$('auth-submit').innerHTML=(reset?'Send reset link':'Sign in')+' <span aria-hidden="true">→</span>';$('back-login').hidden=!reset;document.title='SmartCrop · '+(reset?'Reset password':'Sign in');}
window.addEventListener('hashchange',()=>{route();$('auth-title').setAttribute('tabindex','-1');$('auth-title').focus();});route();
form.addEventListener('input',e=>{if($(e.target.id+'-error'))error(e.target.id,'');$('auth-status').textContent='';});
form.addEventListener('submit',e=>{e.preventDefault();clear();let valid=true;
if(signup){valid=error('name',$('name').value.trim()?'':'Enter your name.')&&valid;if(!$('organisation').disabled)valid=error('organisation',$('organisation').value.trim()?'':'Enter your organisation name.')&&valid;}
valid=error('email',$('email').value.trim()&&$('email').validity.valid?'':'Enter a valid email address.')&&valid;
if(!reset){const password=$('password').value;valid=error('password',!password?'Enter a sample password.':signup&&password.length<12?'Use at least 12 characters.':'')&&valid;}
if(!valid){form.querySelector('[aria-invalid="true"]')?.focus();return;}
$('password').value='';hidePassword();$('auth-status').textContent=reset?'Password reset is not connected yet. No email has been sent.':signup?'Account creation is not connected yet. No account has been created and no details have been saved.':'Sign-in is not connected yet. You have not been signed in. Continue without an account to use SmartCrop.';$('auth-status').focus();
});
$('auth-submit').disabled=false;
})();
