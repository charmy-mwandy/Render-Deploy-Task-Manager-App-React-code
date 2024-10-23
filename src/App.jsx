// import React, { Component } from 'react'
// import './App.css'
// import Modal from './components/Modals';
// import axios from 'axios';

// // Define the base URL depending on the environment
// const isDevelopment = import.meta.env.MODE === 'development';
// const myBaseUrl = isDevelopment 
//   ? import.meta.env.VITE_API_BASE_URL_LOCAL 
//   : import.meta.env.VITE_API_BASE_URL_DEPLOY;

// class  App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       modal: false,
//       viewCompleted: false,
//       activeItem: {
//         title: "",
//         description: "",
//         completed: false
//       },
//       todoList: [],
//     };
//   }

// componentDidMount() {
//   this.refreshList();
// }

// refreshList = () => {
//   axios
//   .get(`${myBaseUrl}api/goals/`)
//   .then(res => this.setState({ todoList: res.data }))
//   .catch(err => console.log(err))
// }


// //Creating toggle properties
//   toggle = ()  => {
//     this.setState({ modal: !this.state.modal })
//   };

//   handleSubmit = item => {
//     this.toggle();  // Close the modal
//     if (item.id) {
//         // Update existing item using PUT
//         axios
//             .put(`${myBaseUrl}api/goals/${item.id}/`, item)
//             .then(res => this.refreshList())
//             .catch(err => console.log(err));
//     } else {
//         // Create new item using POST
//         axios
//             .post("${myBaseUrl}api/goals/", item)
//             .then(res => this.refreshList())
//             .catch(err => console.log(err));
//     }
// };


//   handleDelete = item => {
//     axios
//     .delete(`${myBaseUrl}api/goals/${item.id}/`)
//     .then(res => this.refreshList())
//   };

//   createItem = () => {
//     // const item = { title: "", modal: !this.state.modal }
//     const item = { title: "", description: "", completed: false ,modal: !this.state.modal  };
//     this.setState({ activeItem: item, modal: !this.state.modal })
//   }

//   editItem = (item) => {
//     this.setState({ activeItem: item, modal: true})
//     // this.setState({ activeItem: item, modal: !this.state.modal });
//   }

//   displayCompleted = status => {
//     this.setState({ viewCompleted: status });
//   };

//   renderTabList = () => {
//     return (
//       <div className="my-5 tab-list">
//         <span
//           onClick ={() => this.displayCompleted (true)}
//           className={this.state.viewCompleted ? "active" : ""}
//           style={{ 
//             border: '1px solid black' , 
//             marginRight: 25 , 
//             cursor: 'pointer', 
//             borderRadius: 10, 
//             padding:"5px 8px",
//             color: this.state.viewCompleted ? 'white' : 'black', // Text color for active/inactive state
//             backgroundColor: this.state.viewCompleted ? 'black' : 'white' 
//           }}
          
//         >
//           Completed
//         </span>
//         <span
//           onClick ={() => this.displayCompleted (false)}
//           className={this.state.viewCompleted ?  "" : "active"}
//           style={{ 
//             border: '1px solid black' , 
//             marginRight: 25 , 
//             cursor: 'pointer', 
//             borderRadius: 10, 
//             padding:"5px 8px",
//             color: this.state.viewCompleted ? 'black' : 'white', // Text color for active/inactive state
//             backgroundColor: this.state.viewCompleted ? 'white' : 'black'
//           }}
          
         
//         >
//           Incompleted
//         </span>
//       </div>
//     )
//   }

//   renderItems = () => {
//     // const { viewCompleted } = this.state;
//     // const newItems = this.state.todoList.filter(
//     //   item => item.completed === viewCompleted
//     // );
//     const { viewCompleted, todoList } = this.state;
//     const filteredItems = todoList.filter(item => item.completed === viewCompleted);


//   return filteredItems.map(item =>  (
//     <li 
//       key={item.id}
//       className="list-group-item d-flex justify-content-between align-items-center"
//     >
//       <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
//       title={item.title}>

//       {item.title}
      
//       </span>

//       <span>
//         <button className="btn btn-outline-danger mr-2" onClick={() => this.handleDelete(item)}>Delete</button>
//         <button className="btn btn-outline-success mr-2" onClick={() =>this.editItem(item)}>Edit</button>
//       </span>
//     </li>

//   ))
// };

//   render() {
//     return(
//       <div className="content p-3 mb-2">
//         <h1 className="text-black text-center text-3xl font-bold my-4">Task Manager Application</h1>
//         <div className="row">
//           <div className="col-md-6 col-sma-10 mx-auto p-0 bg-gray-300" >
//             <div className="card p-8">
//               <div>
//                 <button className='btn btn-dark'  onClick={this.createItem}>Add Task</button>
//               </div>
//               {this.renderTabList()}
//               <ul className="list-group list-group-flush">
//                 {this.renderItems()}
//               </ul>
//             </div>

//           </div>
//         </div>
        
//         {this.state.modal ? (
//           <Modal activeItem={this.state.activeItem} toggle={this.toggle}
//           onSave={this.handleSubmit}/>
          
//         ) : null}

//       </div>

//     )
//   }
// }

// export default App

import React, { Component } from 'react';
import './App.css';
import Modal from './components/Modals';
import axios from 'axios';

// Define the base URL depending on the environment
const isDevelopment = import.meta.env.MODE === 'development';
const myBaseUrl = isDevelopment 
  ? import.meta.env.VITE_API_BASE_URL_LOCAL 
  : import.meta.env.VITE_API_BASE_URL_DEPLOY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${myBaseUrl}api/goals/`)
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle(); // Close the modal
    if (item.id) {
      // Update existing item using PUT
      axios
        .put(`${myBaseUrl}api/goals/${item.id}/`, item)
        .then(res => this.refreshList())
        .catch(err => console.log(err));
    } else {
      // Create new item using POST
      axios
        .post(`${myBaseUrl}api/goals/`, item)
        .then(res => this.refreshList())
        .catch(err => console.log(err));
    }
  };

  handleDelete = (item) => {
    axios
      .delete(`${myBaseUrl}api/goals/${item.id}/`)
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false, modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  }

  editItem = (item) => {
    this.setState({ activeItem: item, modal: true });
  }

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
          style={{
            border: '1px solid black',
            marginRight: 25,
            cursor: 'pointer',
            borderRadius: 10,
            padding: "5px 8px",
            color: this.state.viewCompleted ? 'white' : 'black',
            backgroundColor: this.state.viewCompleted ? 'black' : 'white'
          }}
        >
          Completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
          style={{
            border: '1px solid black',
            marginRight: 25,
            cursor: 'pointer',
            borderRadius: 10,
            padding: "5px 8px",
            color: this.state.viewCompleted ? 'black' : 'white',
            backgroundColor: this.state.viewCompleted ? 'white' : 'black'
          }}
        >
          Incompleted
        </span>
      </div>
    );
  }

  renderItems = () => {
    const { viewCompleted, todoList } = this.state;
    const filteredItems = todoList.filter(item => item.completed === viewCompleted);

    return filteredItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.title}>
          {item.title}
        </span>

        <span>
          <button className="btn btn-outline-danger mr-2" onClick={() => this.handleDelete(item)}>Delete</button>
          <button className="btn btn-outline-success mr-2" onClick={() => this.editItem(item)}>Edit</button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <div className="content p-3 mb-2">
        <h1 className="text-black text-center text-3xl font-bold my-4">Task Manager Application</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0 bg-gray-300">
            <div className="card p-8">
              <div>
                <button className='btn btn-dark' onClick={this.createItem}>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
        ) : null}
      </div>
    );
  }
}

export default App;
