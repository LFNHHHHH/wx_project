// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    pageIndex: 0,
		pageSize: 20,
    catId: 1,
		hasMore: true,
    orsh: 'none'
  },
	
	// 自定也加载数据函数
	loadMore: function(){
		// 如果没有更多数据,直接返回
		if(!this.data.hasMore) return;
		wx.request({
			url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
			data:{
			  _limit: this.data.pageSize,
			  _page: ++this.data.pageIndex
			},
			success:(res)=>{
				// 获取当前总的数据
				var newList = this.data.shopList.concat(res.data);
				// 获取数据的条数
				var count = parseInt(res.header['X-Total-Count']);
				// 判断是否还有更多的数据
				var flag = this.data.pageIndex * this.data.pageSize < count
			  this.setData({
			    shopList: newList,
					hasMore: flag,
          orsh:'block'
			  })
			}
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      catId: options.cat
    })
    //根据首页传递过来的参数，设置导航条标题
		if(options.title){
			wx.setNavigationBarTitle({
				title: options.title
			})
		};
		this.loadMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
		this.setData({
			shopList:[],
			pageIndex: 0,
			hasMore: true,
		})
		this.loadMore();
		wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
		this.loadMore()
    if(!this.data.hasMore){
      this.setData({
        orsh: 'none'
      }),
      wx.showToast({
        title: '到底了',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})