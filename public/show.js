// $(document).ready(function(){
// $('#add-book').on('submit', function(e){
//     e.preventDefault();
//     var title = $('#title').val();
//     var category = $('#category').val();
//     var excerpt = $('#excerpt').val();
//     var URL = 'mongodb://localhost/alt';
//     $.ajax({
//         url: URL,
//         data: JSON.stringify({ 
//             "title" : title,
//             "category": category,
//             "excerpt": excerpt
//         }),
//         type: "POST",
//         contentType: "application/json",
//         success: function(data){
//             window.location.href="show.html"
//         },
//         error: function(xhr, status, err){
//             console.log(err);
//         }
        
//     });
// });
// });

// This ist the entry point to your application


// window.onload = function() {
//     var mydiv = document.createElement('div');
    
//     fetch('http://localhost/book/13')
//      .then(function(response) {
//               mydiv.innerHTML = response.json()
//             document.body.appendChild(mydiv);
//      })
//      .then(function(myJson) {
//        console.log(JSON.stringify(myJson));
//      });	
// }; 
