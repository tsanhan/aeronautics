import app from './config.js'

// import '@firebase/firestore';
//const firestoreDB = app.firestore();

$(document).ready(() => {
    const wrapper = $('.wrapper');
    const template = $('template')[0];

    app.firestore().collection('cords').onSnapshot(cordsSnapshot => {
        // QueryDocumentSnapshot 
        const cords = cordsSnapshot.docs.map(doc => doc.data())
        wrapper.empty();
        cords.forEach(cord => {
            const card = $(template.innerHTML);
            card.css("bottom", `${cord.y}vh`);
            card.css("left", `${cord.x}vw`);
            card.find('.text').text(cord.name)
            $(card).appendTo(wrapper)
        })
    })




}) 
