let currentpage = 1
let totalpage

function users (page) {
    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })
    .then(function(response){
        if (response.status !==200) {
            throw response.status;
        }
        return response.json();
    })
    .then(function(responseData){
        var fragment = document.createDocumentFragment();
        responseData.data.forEach(x => {
            let li=document.createElement('li');
            li.classList.add('list');
            let img=document.createElement('img');
            img.src=x.avatar;
            let span=document.createElement('span');
            span.textContent=x.first_name + ' ' + x.last_name;
            li.appendChild(img);
            li.appendChild(span);
            fragment.appendChild(li);
        });
        document.getElementById('users-ul').innerHTML=' ';
        document.getElementById('users-ul').appendChild(fragment);
        totalpage=responseData.total_pages;


    })
    .catch(function(error){
        if(error==404){
            let p=document.createElement('p');
            p.textContent='PAGE NOT FOUND';
            document.getElementById('container').appendChild(p)
        } else {
            let p=document.createElement('p');
            p.textContent='SERVER ERROR';
            document.getElementById('container').appendChild(p);
        }
    })
    
}
document.getElementById('back').addEventListener('click', function(){
    if(currentpage===1){
        return;
    }
    currentpage -=1;
    users(currentpage);
})
document.getElementById('next').addEventListener('click',function(){
    if(currentpage===totalpage){
        return;
    }
    currentpage +=1;
    users(currentpage);
})
users(currentpage);