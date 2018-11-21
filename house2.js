const app = new Vue({
    el: '#tgifApp',
    data: {
        congressmen: [],
        leastLoyal: [],
        mostLoyal: []

    },
    created() {
        fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
            headers: new Headers({
                'X-API-Key': 'XiS3U2dJVOswHAgjUcMNIBkG4aANYLQIBCowZeNB'
            })
        }).then(response => response.json()).then(response => {
            this.congressmen = response.results[0].members
            return this.congressmen
        })
    },
    computed: {
        getLeastLoyal() {
            var result = []
            var percentage = this.congressmen.length / 100 * 10
            this.congressmen.forEach(function (congressman) {
                result.push(congressman.votes_with_party_pct)
            })
            result.sort((a, b) => a - b)
            result = result.slice(0, percentage)
            var breakPoint = Math.max(...result);
            this.leastLoyal = this.congressmen.filter(member => member.votes_with_party_pct <= breakPoint)
            return this.leastLoyal

        },
        getMostLoyal() {
            var result = []
            var percentage = this.congressmen.length / 100 * 10
            this.congressmen.forEach(function (congressman) {
                result.push(congressman.votes_with_party_pct)
            })
            result.sort((a, b) => b - a)
            result = result.slice(0, percentage)
            var breakPoint = Math.min(...result);
            this.mostLoyal = this.congressmen.filter(member => member.votes_with_party_pct >= breakPoint)
            return this.mostLoyal

        },

        getMostEngaged() {
            var result = []
            var percentage = this.congressmen.length / 100 * 10
            this.congressmen.forEach(function (congressman) {
                result.push(congressman.missed_votes_pct)
            })
            result.sort((a, b) => a - b)
            result = result.slice(0, percentage)
            var breakPoint = Math.max(...result);
            this.leastEngaged = this.congressmen.filter(member => member.missed_votes_pct <= breakPoint)
            return this.leastEngaged
        },

        getLeastEngaged() {
            var result = []
            var percentage = this.congressmen.length / 100 * 10
            this.congressmen.forEach(function (congressman) {
                result.push(congressman.missed_votes_pct)
            })
            result.sort((a, b) => b - a)
            result = result.slice(0, percentage)
            var breakPoint = Math.min(...result);
            this.mostEngaged = this.congressmen.filter(member => member.missed_votes_pct >= breakPoint)
            return this.mostEngaged
        },

        createArray() {
            var array = [{
                    name: 'Democrats',
                    numberOfMembers: this.count("D"),
                    votesPercentage: this.percentVoted("D")
                 },
                {
                    name: 'Republicans',
                    numberOfMembers: this.count("R"),
                    votesPercentage: this.percentVoted("R")
                 },
                {
                    name: 'Independents',
                    numberOfMembers: this.count("I"),
                    votesPercentage: this.percentVoted("I")
                 },
                {
                    name: "Total",
                    numberOfMembers: this.count("I") + this.count("D") + this.count("R"),
                    votesPercentage: this.totalPercentage().toFixed(2)
                 }
                 ]
            return array

        }
    },

    methods: {
        count(partyCode) {
            return this.congressmen
                .filter(member => member.party === partyCode)
                .length
        },


        percentVoted(partyCode) {
            var memberspercent = []
            var members = this.congressmen.filter(member => member.party === partyCode)
            for (var i = 0; i < members.length; i++) {
                memberspercent.push(members[i].votes_with_party_pct)
            }
            memberspercent = memberspercent.reduce((a, b) => a + b, 0) / members.length
              if (members.length === 0){
               return memberspercent = 0
            }
            memberspercent = memberspercent.toFixed(2);
            return memberspercent
            
        },

        totalPercentage() {
            var membersPercentTotal = []
            for (var i = 0; i < this.congressmen.length; i++) {
                membersPercentTotal.push(this.congressmen[i].votes_with_party_pct)
                var result = membersPercentTotal.reduce(function (a, b) {
                    return a + b;
                }, 0);
            }
            return result / this.congressmen.length
        }
    }
})
