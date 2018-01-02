var should = require('should');
request = require('supertest');
app= require ('../app.js');
mongoose = require('mongoose');
Book=mongoose.model('Book');
agent = request.agent(app);


describe('Book Crud Test', function(){
   it('Should allow a book to be posted and return an _id', function(done){
       var bookPost = {title:'new Book', author:'Apurv'};
       
       agent.post('/api/books')
       .send(bookPost)
       .expect(200)
       .end(function(err, results){
           results.body.should.have.property('_id');
           done();
       })
   }) 
   afterEach(function(done){
       Book.remove().exec();
       done();
   })
});