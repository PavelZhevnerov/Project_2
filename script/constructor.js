'use strict';

function THashStorage(){
  var self = this;
  self.StorageH = {};
  
  self.addValue = function(key, value){
    self.StorageH[key] = value;
  }
  
  self.getValue = function(key){
    if(key in self.StorageH){
      return self.StorageH[key];
    } 
  }
  
  self.deleteValue = function(key){
    if(key in self.StorageH){
      delete self.StorageH[key];
      return true;
    } else{
      return false;
    }
  }
  
  self.getKeys = function(){
    return Object.keys(self.StorageH);
  }
};
