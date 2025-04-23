function showModal(id) { 
    document.getElementById(id).style.display = 'flex'; 
}
function hideModal(id) { 
    document.getElementById(id).style.display = 'none'; 
}
function submitForm() {
    hideModal('submitModal'); 
    loadPage('home');  
}
