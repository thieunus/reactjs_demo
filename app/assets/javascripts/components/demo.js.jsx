const initialUserState = {

};
const thunk = ReduxThunk.default;


const store = Redux.createStore(ReactReduxForm.combineForms({
  user: initialUserState,
}), Redux.applyMiddleware(thunk));


var array1 = ["first_name", "last_name", "email", "avatar", "address.line1", "address.line2", "address.city", "address.state", "address.country"]

var array2 = ["text", "text", "email", "file", "text", "text", "address.city", "text", "text"];


getModel = function(item){
  return "user." + array1[item];
}

getControl = function(item){

  return array2[item];
}

appendFormData = function(formData, values, parent){
  for(var i in values){
    value = values[i];
    if(parent){
      inputName = parent + "[" + i + "]"
    }else {
      inputName = i;
    }
    if(typeof(value) == "string"){
      formData.append(inputName, value);
    }else if(Array.isArray(value)){
      for(var j in value){
        formData.append(inputName + "[" + j + "]", value[j]);
      }
    }
    else if(typeof(value)=="object"){
      appendFormData(formData, value, i)
    }
  }
}

var InputItem = React.createClass({
  render: function(){
    return(
      <div className="form-group">
        <label className="control-label">Name </label>
        <ReactReduxForm.Control type={getControl(this.props.item)} className="form-control my-form-control" model={getModel(this.props.item)} placeholder={getModel(this.props.item)}/>
        <a href="javascript:void(0)" className="btn btn-danger" onClick={() => this.props.click(this.props.item)}><i className="fa fa-remove"></i></a>
      </div>
    )
  }
})
var Demo = React.createClass({
    getInitialState: function() {
        this.removeRecord = this.removeRecord.bind(this);
        return {inputs:[0,1]};
    },
    handleSubmit: function(values) {
      console.log(values);
      formData = new FormData();
      appendFormData(formData, values, null);
      console.log(formData);
      config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      Axios.post("/upload", formData, config)
    },
    removeRecord: function(index){
      console.log(index)
      this.state.inputs.splice(index, 1);
      this.setState({ inputs: this.state.inputs},function(){
          return;
      });

    },
    appendInput: function(e) {
        e.preventDefault();
        var i = 0;
        while(i < array1.length){
          if(!this.state.inputs.includes(i)){
            this.setState({ inputs: this.state.inputs.concat(i)});
            break;
          }
          i++;
        }
    },
    render: function() {
        var self = this;
        return(
            <div className="room-main" >
              <h2 className="room-head">Many fields form</h2>
              <a href="javascript:void(0);" onClick={this.appendInput} className='btn btn-primary'><i className="fa fa-plus-circle"></i> Add more field</a>
              <ReactReduxForm.Form id='myform' model="user" onSubmit={this.handleSubmit}>
              <br/>
              {this.state.inputs.map(function(item){
                return (
                  <InputItem item={item} key={item} click={self.removeRecord}/>
                )

             })}
             <button type="submit" className='btn btn-primary'>Save All</button>
             </ReactReduxForm.Form>
            </div>
        );
    }
});


ReactDOM.render(
   <ReactRedux.Provider store={store}>
    <Demo/>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
