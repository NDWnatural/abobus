function download() {
    const apiUrl = 'https://abobus-snowy.vercel.app';
    const videoUrl = document.getElementById('videoUrl').value;

    if (!videoUrl) {
        alert('Por favor, insira a URL do vídeo.');
        return;
    }

    fetch(`${apiUrl}/download?url=${videoUrl}`, {
        method: 'POST', // Alterado para POST
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        // Enviando a URL do vídeo no corpo da requisição como JSON
        body: JSON.stringify({ videoUrl }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao iniciar o download.');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audio.mp3';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao processar o download.');
    });
}
