function showCodeForm(boolean) {
    console.log(boolean, "showCodeForm called");
    document.getElementById('reset-code').style.display = boolean ? 'block' : 'none';
}