const app = new Vue({
    el: '#tgifApp',
    data: {
        senators: [],
        parties: [],
        newArray: [],
        states: [],
        option: "all"
    },
    created() {
        fetch('https://api.propublica.org/congress/v1/115/house/members.json', {
            headers: new Headers({
                'X-API-Key': 'XiS3U2dJVOswHAgjUcMNIBkG4aANYLQIBCowZeNB'
            })
        }).then(response => response.json()).then(response => {
           this.senators = response.results[0].members
             this.newArray = this.senators
        })
    },
    methods: {

        getByParty(parties) {
            return this.senators.filter(function (senator) {

                var partyFilter = parties.length == 0 || parties.includes(senator.party)

                return partyFilter
            })
        }
    },
    computed: {
          filterParty() {
              return this.senators.filter(senator => {
                  var partyFilter = this.parties.length === 0 || this.parties.includes(senator.party)
                  var stateFilter = this.option == "all" || this.option == senator.state
                  return partyFilter && stateFilter
              })
        },
        getStates() {

           this.states = this.senators.map(senator => {
               return senator.state

           })


           return this.states.reduce(function (a, b) {
               if (a.indexOf(b) < 0) a.push(b);
               return a.sort();
           }, [])

       }
    }
})