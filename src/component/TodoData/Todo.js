import React, { useEffect, useState } from 'react'

const Todo = () => {


    // Store the Data for localStorage
    const getData = () => {
        const list = localStorage.getItem("mytodolist");
        if (list) {
            return JSON.parse(list)
        }
        else return []
    }
    const [text, setText] = useState();
    const [item, setItem] = useState(getData());
    const [toggle, setToggle] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null);
    // Add Item Data
    const addItem = () => {
        if (!text) {
            alert("No Word")
        }
        else if (text && toggle) {
            setItem(item.map((element) => {
                if (element.id === isEditItem) {
                    return { ...element, name: text };
                }
                return element;
            }))
            setText("");
            setIsEditItem(null);
            setToggle(false);
        }



        else {
            const allData = { id: new Date().getTime().toString(), name: text };
            console.log(3333, allData.id)
            setItem([...item, allData])
            setText("")
        }
    }

    // delete the data

    const deleteItems = (index) => {
        const updateData = item.filter((element) => {
            console.log("mmyy", element)
            return element.id !== index
        })
        setItem(updateData)
    }


    // Remove All Data

    const removeAll = () => {
        setItem([])
    }

    // edit the data
    const editData = (id) => {
        const newUpdateData = item.find((element) => {
            return element.id === id;
        });
        setText(newUpdateData.name);
        setIsEditItem(id);
        setToggle(true);
    };



    // Perform UseEffect Hooks
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(item))
    }, [item])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="https://www.arcprint.in/assets/media/products_common_imgs/notebook/notebook-1.jpg" style={{ borderRadius: "10px" }} alt="Girl in a jacket" />

                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form-control"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        {toggle ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>
                    {/* show our items  */}
                    <div className="showItems">

                        {item.map((element) => {
                            return (
                                <div className="eachItem" key={element.id}>
                                    <h3>{element.name}</h3>

                                    <div className="todo-btn" >
                                        <i className="far fa-edit add-btn" onClick={() => editData(element.id)} title='Update Todo'></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItems(element.id)} title='Delete Items'></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* rmeove all button  */}
                    <div className="showItems">
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All" onClick={removeAll}>
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
