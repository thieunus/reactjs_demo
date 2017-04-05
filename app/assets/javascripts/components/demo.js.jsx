
reducer = Redux.combineReducers({
  form: ReduxForm.reducer // mounted under "form"
})

store = Redux.createStore(reducer)


var Demo = React.createClass({
    getInitialState: function() {
        //this.removeRecord = this.removeRecord.bind(this);
        return {inputs:[0,1]};
    },
    //  constructor: function(props){
    //     super(props);
    //     this.removeRecord = this.removeRecord.bind(this);
    // },
    handleSubmit: function(e) {
        e.preventDefault();
        var self = this;
        //console.log(this.refs)
        console.log(e);
        //console.log( Object.keys(this.refs).map(function(ref){
            //console.log(ref)
        //    self.refs[ref].value;
            //ReactDOM.findDOMNode(ref).value
        //}) );
        console.log($('form#myform').serializeJSON());
        return false;
    },
    removeRecord: function(index){
        e.preventDefault();

        this.state.inputs.splice(index, 1)
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
        var style = {
            color: 'green'
        };


        return(
            <div className="room-main" >
                <div className="online-est">
                    <h2 className="room-head">Room Details
                        <button onClick={this.handleSubmit} className="rednew-btn"><i className="fa fa-plus-circle"></i> Save All</button>&nbsp;
                        <a href="javascript:void(0);" onClick={this.appendInput} className="rednew-btn"><i className="fa fa-plus-circle"></i> Add Room</a>
                    </h2>
                    <ReduxForm.Form id='myform' onSubmit={v => console.log(v)}>
                    <ReactFileUpload.Uploader url='/upload' checkType={true}/>

                    <ReactS3Uploader
                      signingUrl="/s3_signin"
                      signingUrlMethod="GET"
                      accept="image/*"
                      preprocess={this.onUploadStart}
                      onProgress={this.onUploadProgress}
                      onError={this.onUploadError}
                      onFinish={this.onUploadFinish}

                      signingUrlWithCredentials={ true } // in case when need to pass authentication credentials via CORS
                      uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                      contentDisposition="auto"
                      scrubFilename={(filename) => filename.replace(/[^\w\d_\-\.]+/ig, '')}
                      server="http://localhost:4000" />


                   {this.state.inputs.map(function(item){
                        return (
                                <div className="room-form" key={item} id={item}>
                                    {item}
                                    <a href="" className="remove"><i className="fa fa-remove"></i></a>
                                    <ul>
                                        <li>
                                            <label>Name <span className="red">*</span></label>
                                            <input type="text" name={'name'+item} defaultValue={item} />

                                        </li>

                                    </ul>
                                </div>
                        )

                   })}
                   <button type="submit">AAA</button>
                   </ReduxForm.Form>
                </div>
            </div>
        );
    }
});

// Decorate the form component
Demo = ReduxForm.reduxForm({
  form: 'contact' // a unique name for this form
})(Demo);

ReactDOM.render(
   <ReactRedux.Provider store={store}>
    <Demo/>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
