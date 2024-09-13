function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const burger = document.getElementById('burger');
    const close = document.getElementById('close');
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block'; 
        burger.style.display = 'none'; 
        close.style.display = 'block'; 
    } else {
        sidebar.style.display = 'none';  
        close.style.display = 'none'; 
        burger.style.display = 'block'; 
    }
}


