export const generateTxHash = () => {
    let alphabet = "0123456789ABCDEF"
    return Array(64).fill(0).map(_ => alphabet[(Math.random() * alphabet.length) | 0]).join('')
}

export class PRNGRand {
    constructor(hash) {
        let queryHash = new URLSearchParams(window.location.search).get('hash')
        hash = queryHash || hash?.toString() || generateTxHash()
        hash = hash.toUpperCase()
        const regex = new RegExp('[0-9A-F]{64}')
        if (!regex.test(hash)) {
            console.error("Bad hash", hash)
        }
        this.useA = false;
        let sfc32 = function (uint128Hex) {
            let a = parseInt(uint128Hex.substring(0, 8), 16);
            let b = parseInt(uint128Hex.substring(8, 8), 16);
            let c = parseInt(uint128Hex.substring(16, 8), 16);
            let d = parseInt(uint128Hex.substring(24, 8), 16);
            return function () {
                a |= 0;
                b |= 0;
                c |= 0;
                d |= 0;
                let t = (((a + b) | 0) + d) | 0;
                d = (d + 1) | 0;
                a = b ^ (b >>> 9);
                b = (c + (c << 3)) | 0;
                c = (c << 21) | (c >>> 11);
                c = (c + t) | 0;
                return (t >>> 0) / 4294967296;
            };
        };
        // seed prngA with first half hash
        this.prngA = new sfc32(hash.substr(2, 32));
        // seed prngB with second half of hash
        this.prngB = new sfc32(hash.substr(34, 32));
        for (let i = 0; i < 1e6; i += 2) {
            this.prngA();
            this.prngB();
        }
        this.grand = () => {
            this.useA = !this.useA;
            return this.useA ? this.prngA() : this.prngB();
        }
    }

    /**
     * Create a floating point random number between [0,1)
     * @param lo optional lower bound (default 0). When specified returns [lo,1)
     * @param hi optional upper bound (default 1). When included with lo returns [lo,hi)
     * @returns {number|*}
     */
    random(lo, hi) {
        if (lo === undefined && hi === undefined) return this.grand()
        if (hi === undefined && lo !== undefined) {
            return this.grand() * lo
        }
        return this.grand() * (hi - lo) + lo
    }

    boolean() {
        return this.grand >= 0.5
    }

    /**
     * Return a random integer between [lo,hi] where lo and hi are inclusive.
     */
    randomInt(lo, hi) {
        if (lo === undefined && hi === undefined) {
            throw new Error("randomInt requires two arguments")
        }
        return Math.floor(this.random(lo, hi + 1))
    }

    /**
     * Return a random element from an array.
     */
    randomList(list) {
        return list[this.randomInt(0, list.length - 1)]
    }

    /**
     * Return one of the keys based on the value probability versus the sum of
     * all other key values.
     *
     * Example:
     *
     * `randomWeighted(new Map([['Low', .1],['Medium', .3],['High', .6]]))`
     *  has a 10% chance of returning 'Low',
     *  a 30% chance of returning 'Medium', and a 60% chance of returning
     *  'High'. Probability values do not need to add up to 1.
     */
    randomWeighted(map) {
        const keys = Array.from(map.keys());
        const totalSum = keys.reduce((acc, item) => acc + map.get(item), 0);
        let runningTotal = 0;
        const cumulativeValues = keys.map((key) => {
            const relativeValue = map.get(key) / totalSum;
            const cv = {
                key,
                value: relativeValue + runningTotal
            };
            runningTotal += relativeValue;
            return cv;
        });
        const r = this.random();
        return cumulativeValues.find(({key, value}) => r <= value).key;
    };
}