const initialUserState = {

};
const thunk = ReduxThunk.default;


const store = Redux.createStore(ReactReduxForm.combineForms({
  user: initialUserState,
}), Redux.applyMiddleware(thunk));

getModel = function(item){
  var array = ["first_name", "last_name", "email", "avatar", "address.line1", "address.line2", "address.city", "address.state", "address.country"]
  return "user." + array[item];
}

getControl = function(item){
  var array = ["text", "text", "email", "file", "text", "text", "address.city", "text", "text"]
  return array[item];
}
var Demo = React.createClass({
    getInitialState: function() {
        //this.removeRecord = this.removeRecord.bind(this);
        return {inputs:[0,1]};
    },
    //  constructor: function(props){
    //     super(props);
    //     this.removeRecord = this.removeRecord.bind(this);
    // },
    handleSubmit: function(v) {
        console.log(v);
    },
    removeRecord: function(index){
        this.state.inputs.splice(index, 1);
        this.setState({ inputs: this.state.inputs},function(){
            return;
        });

    },
    appendInput: function(e) {
        e.preventDefault();
        var newInput = this.state.inputs.length;

        this.setState({ inputs: this.state.inputs.concat(newInput)},function(){
            return;
        });

        //$('.online-est').next('.room-form').remove()

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
                          <div className="form-group" id={item}>
                            <label className="control-label">Name</label>
                            <ReactReduxForm.Control type={getControl(item)} className="form-control my-form-control" model={getModel(item)} placeholder={getModel(item)}/>
                            <a href="javascript:void(0)" className="btn btn-danger" onClick={self.removeRecord}><i className="fa fa-remove"></i></a>
                          </div>
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
