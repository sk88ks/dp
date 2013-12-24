 
/**
 * 三次元動的計画法を用いてナップザック問題を計算
 * 通常のナップザック問題に加え、cost以外にもう1つの制限が設定可能
 * todo
 * 最適解を求められていない
 * 三次元目の扱いに問題あり
 * キャッシュしているのに非常に重い
 *
 * @param {Array} list
 * @param {Number} maxCost
 * @param {Number} maxNum
 * @return {Object}
 */
var dpThreeDimensions = function(list, maxCost, maxNum) {

    var dp = {};
    var i, j, k;
    var cost, total, count;
    for (i = 0; i <= maxCost; i++) {
        dp[i] = dp[i] || {};
        for (j = 0; j < list.length; j++){
            dp[i][j] = dp[i][j] || {};
            dp[i][j + 1] = dp[i][j + 1] || {};
            cost = list[j].cost;
            total = list[j].param.total;
            count = 1;
            for (k = 0; k <= maxNum; k++){

                dp[i][j][k] = dp[i][j][k] || 0;
                if (i < cost || k < count) {
                    dp[i][j + 1][k] = dp[i][j][k];
                } else {
                    dp[i - cost][j][k - count] = dp[i - cost][j][k - count] || 0;
                    if (dp[i][j][k] <= dp[i - cost][j][k - count] + total) {
                        dp[i][j + 1][k + count] = dp[i - cost][j][k - count] + total;
                    } else {
                        dp[i][j + 1][k] = dp[i][j][k];
                    }
                }

            }
        }
    }

    var selected = [];
    var rest = [];
    var totalCost  = 0;
    var totalPoint  = 0;
    i = maxCost;
    k = maxNum;
    for (j = list.length - 1; j >=0; j--) {
        cost = list[j].cost;
        total = list[j].param.total;
        count = 1;
        dp[i] = dp[i] || {};
        dp[i][j] = dp[i][j] || {};
        dp[i][j][k] = dp[i][j][k] || 0;
        dp[i - cost] = dp[i - cost] || {};
        dp[i - cost][j] = dp[i - cost][j] || {};
        dp[i - cost][j][k - count] = dp[i - cost][j][k - count] || 0;
        if (cost <= i && count <= k && dp[i][j][k] < dp[i - cost][j][k - count] + total) {
            selected.push(list[j]);
            i -= cost;
            k -= count;
            totalPoint += total;
            totalCost += cost;
            continue;
        }
        rest.push(list[j]);
    }

    return  { deck: selected, rest: rest, total: totalPoint, cost: totalCost };
};


/**
 * 動的計画法を用いてナップザック問題を計算
 *
 * @param {Array} list
 * @param {Number} maxCost
 * @param {Number} maxNum
 * @return {Object}
 */
var dpTwoDimensions = function(list, maxCost, maxNum) {

    var dp = {};
    var i, j;
    var cost, total, count;
    for (i = 0; i <= maxCost; i++) {
        dp[i] = dp[i] || {};
        for (j = 0; j < list.length; j++){
            cost = list[j].cost;
            total = list[j].param.total;

            dp[i][j] = dp[i][j] || 0;
            if (i < cost) {
                dp[i][j + 1] = dp[i][j];
            } else {
                dp[i - cost] = dp[i - cost]|| {};
                dp[i - cost][j] = dp[i - cost][j] || 0;
                if (dp[i][j] <= dp[i - cost][j] + total) {
                    dp[i][j + 1] = dp[i - cost][j] + total;
                } else {
                    dp[i][j + 1] = dp[i][j];
                }
            }
        }
    }

    var selected = [];
    var rest = [];
    var totalCost  = 0;
    var totalPoint  = 0;
    i = maxCost;
    for (j = list.length - 1; j >=0; j--) {
        cost = list[j].cost;
        total = list[j].param.total;
        if (cost <= i && dp[i][j] < dp[i - cost][j] + total) {
            selected.push(list[j]);
            i -= cost;
            totalPoint += total;
            totalCost += cost;
            continue;
        }
        rest.push(list[j]);
    }

    return  { deck: selected, rest: rest, total: totalPoint, cost: totalCost };
};     
