let arrayOfTodo = localStorage.getItem("To-do") ? JSON.parse(localStorage.getItem("To-do")):[];
        const addButtonListener = () => {
              let getInput = document.querySelector('input');
              let getError = document.querySelector('small');
              let inputValue = getInput.value;
              if(getInput.value == ''){
                getError.style.display = 'block';
              }
              else{
              arrayOfTodo.push(inputValue);
              getInput.value = '';
              let stringOfArray = JSON.stringify(arrayOfTodo);
              localStorage.setItem('To-do',stringOfArray);
              console.log(localStorage); 
              displayItem();
              getError.style.display = 'none';
              }   
        };
      
        const displayItem = () => {
          let getOutputContainer = document.querySelector('.output-container');
          
          let newHtml = '';
          for(let i = 0; i < arrayOfTodo.length; i++){
            let getArrayOfLocalStorage = localStorage.getItem('To-do');
             let objectOfStoredArray = JSON.parse(getArrayOfLocalStorage);
            let todoItem = objectOfStoredArray[i];
            let count = i + 1;
            
            newHtml += `
                       <div class="item">
                        <h2>${count}.</h2>
                       <textarea disabled>${todoItem}</textarea>
                       <button class = "remove-button"><i class="fa-solid fa-trash"></i></button>
                       <button class = "edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
                       <div class="update-controller">
                       <button class = "save-button"><i class="fa-solid fa-check"></i></button>
                       <button class = "cancel-button"><i class="fa-solid fa-xmark"></i></button>
                       </div>
                    </div>
                       `;
               
          };
          arrayOfTodo.length == 0 ? getOutputContainer.innerHTML = `
          <h1>Welcome Guys</h1>
          <h4><i class="fa-solid fa-trash"></i> This button is for remove or delete items from notepad.</h4>
          <h4><i class="fa-solid fa-pen-to-square"></i> This button is for edit or update your content.</h4>
          <h4><i class="fa-solid fa-check"></i> This button is for save content after updation.</h4>
          <h4><i class="fa-solid fa-xmark"></i> This button is for cancel updation.</h4>
          `:
           getOutputContainer.innerHTML = newHtml;
          removeItemListener();
          editButtonListener();
          saveButtonListener();
          cancelButtonListener();
        };


        const removeItemListener = () => {
            let getRemoveButton = document.querySelectorAll('.remove-button');
            let getArrayOfLocalStorage = localStorage.getItem('To-do');
            getRemoveButton.forEach((rb,i) => {
                rb.addEventListener("click",() => {
                    arrayOfTodo.splice(i,1);
                    localStorage.setItem('To-do',JSON.stringify(arrayOfTodo));
                    location.reload();
                });
            });
        };

        const editButtonListener = () => {
            let getEditButton = document.querySelectorAll('.edit-button');
            let getTextArea = document.querySelectorAll('textarea');
            let getUpdateController = document.querySelectorAll('.update-controller');
            getEditButton.forEach((eb,i) => {
               eb.addEventListener('click' , () => {
                getTextArea[i].disabled = false;
                getUpdateController[i].style.display = 'flex';
               });
            });
        };

        const saveButtonListener = () => {
            let getSaveButton = document.querySelectorAll('.save-button');
            let getTextArea = document.querySelectorAll('textarea');
            getSaveButton.forEach((sb,i) => {
                sb.addEventListener("click",() => {
                   let text = getTextArea[i].value;
                    arrayOfTodo[i] = text;
                    localStorage.setItem("To-do",JSON.stringify(arrayOfTodo));
                    location.reload();
                });
            });
        };

        const cancelButtonListener = () => {
            let getCancelButton = document.querySelectorAll('.cancel-button');
            let getTextArea = document.querySelectorAll('textarea');
            let getUpdateController = document.querySelectorAll('.update-controller');
            getCancelButton.forEach((cb,i) => {
                cb.addEventListener("click" , () => {
                    getTextArea[i].disabled = true;
                    getUpdateController[i].style.display = 'none';
                    location.reload();
                });
            });

        };

       displayItem();