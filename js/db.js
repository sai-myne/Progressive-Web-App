// offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            // probably multiple tabs open at once
            console.log('persistence failed');
        } else if(err.code == 'unimplemented'){
            // lack of browser support
            console.log('persisten is not available');
        }
    });

// real-time listener
db.collection('recipes').onSnapshot(snapshot => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        // console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added'){
            // add the document data to the web page
            renderRecipe(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed'){
            // remove the document data from the web page
        }
    })
})

