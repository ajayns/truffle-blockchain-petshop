App = {
  web3Provider: null,
  contracts: {},

  init: function() {

    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // If there is injected web3
    if(typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // Else fallback to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {

      // Retrieve data, init truffle contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set provider for contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use contract to mark adopted pets
      return App.markAdopted();
    })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  // Function to mark already adopted pets
  markAdopted: function(adopters, account) {
    var adoptionInstance;

    // Call a promise if deployed
    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      // Retrieve array of adopters from blockchain
      // call() reads data from blockchain without spending ether
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      // If retrieved
      // Check for adopted and mark them
      for(i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      // Log error message in case function fails
      console.log(err.message);      
    })
  },

  handleAdopt: function(event) {
    event.preventDefault();
    
    // event.target gives clicked element
    // 'id' data is retrieved from element
    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(err, accounts) {
      if(err) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(res) {
          // If transaction successful, again mark adopted
          return App.markAdopted();
        }).catch(function(err) {
          console.log(err.message);
        })
      });
    
  }

};

// Initialize app when window loaded
$(function() {
  $(window).load(function() {
    App.init();
  });
});
