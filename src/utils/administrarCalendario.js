function onLoadCalendarInnerHtml(cssClass, events) {
    const collection = document.getElementsByClassName(cssClass);
   // alert(collection.length);
    for (let i = 0; i < collection.length; i++) {
       // collection[i].style.backgroundColor = "red";
        const  textContent= collection[i].textContent;

        console.log(textContent);

        const found = events.find((p) => p.title === textContent);

        console.log(found);

        let dtStart = new Date(found.start);
        let dtEnd = new Date(found.end);

        collection[i].innerHTML =
            '<div class="">' +
                    '<img src="/assets/ico/cheque.png"  width="15" height="15"> &nbsp;'+
                    '<i class="fa-regular fa-circle-check"></i>'+
                    'Aldo <br>' +
                    dtStart.getHours() + ':' + dtStart.getMinutes()  + '- ' +
                    dtEnd.getHours()+ ':' + dtEnd.getMinutes() + ' <br>' +
                    '<div>'+ found.title +'</div>'
            '</div>'

    }
    // alert('hola cargar html de la clase '+ collection)


}