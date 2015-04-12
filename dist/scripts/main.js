!function(){"use strict";var t,e,a,l="data/data.csv",n=2016,s={enrollment:"Enrollment-based funds",specialty:"Speciality funds",perpupilmin:"Per-pupil minimum",stabilization:"Stabilization funds",sped:"Special education",ell:"English learners",atrisk:"At-risk funds",income:"Income-linked (i.e. Title I)"},i=d3.format(",.0f"),r=d3.format("04d");$(function(){d3.csv(l,function(t){var e={name:t.SCHOOLNAME,year:+t.YEAR,code:r(t.SCHOOLCODE),ward:""===t.WARD?null:t.WARD,level:""===t.LEVEL?null:t.LEVEL,fortyForty:t.FORTYFORTY,budget:{},enrollment:{}};return e.budget[t.YEAR]=[{category:"enrollment",value:+t.ENROLLMENTFUNDS},{category:"specialty",value:+t.SPECIALTY},{category:"perpupilmin",value:+t.PERPUPILMIN},{category:"stabilization",value:+t.STABILIZATION},{category:"sped",value:+t.SPED},{category:"ell",value:+t.ELL},{category:"atrisk",value:+t.ATRISK},{category:"income",value:+t.INCOME}],e.enrollment[t.YEAR]={total:""===t.ENROLLMENT?null:+t.ENROLLMENT,atRisk:""===t.ATRISKENROLLMENT?null:+t.ATRISKENROLLMENT},e},t.initialize)}),t={initialize:function(e){function a(){"gened"===t.globals.category&&"Bars"===t.globals.view?$("#legend").removeClass("hidden"):$("#legend").addClass("hidden")}t.globals={},$("#loading").fadeOut(),$("#main").fadeIn(),$("p.what a").click(function(){var t=$.attr(this,"href");return $("html, body").animate({scrollTop:$(t).offset().top},500),!1});var l=_.partition(e,{year:n});t.data=l[0],_.each(l[1],function(e){var a=_.find(t.data,function(t){return t.code===e.code});a.budget[e.year]=e.budget[e.year],a.enrollment[e.year]=e.enrollment[e.year]}),t.filterData({}),t.setCategory("gened"),t.loadView("Lines"),$(window).resize(function(){t.view.resize()}),a(),$("#views").change(function(e){t.loadView($(e.target).attr("value")),a()}),$("#filters").change(function(){var e={};$("#filters input:checked").each(function(){var t=$(this),a=t.attr("value");a&&(e[t.attr("name")]=a)}),t.filterData(e)}),$("#categories").change(function(e){t.setCategory($(e.target).attr("value")),a()})},filterData:function(e){t.globals.filter=e;var a=_.matches(e);_.each(t.data,function(t){t.filtered=!_.isEmpty(e)&&!a(t)}),t.view&&t.view.refresh()},setCategory:function(e){t.globals.category=e;var a="gened"===e?["enrollment","specialty","perpupilmin","stabilization"]:[e],l=function(t,e){return t+e.value};_.each(t.data,function(t){t.selected={},_.each(t.budget,function(n,s){var i,r,o;"total"===e?(i=_.reduce(n,l,0),o={lines:[{category:"total",value:i}],total:i,fullBudget:i}):(r=_.partition(n,function(t){return _.includes(a,t.category)}),o={},o.lines=r[0],o.total=_.reduce(o.lines,l,0),o.lines.push({category:"other",value:_.reduce(r[1],l,0)}),o.fullBudget=_.reduce(o.lines,l,0)),t.selected[s]=o}),t.change=null,_.has(t.selected,n-1)&&(t.change=t.selected[n].total/t.selected[n-1].total-1)}),t.view&&t.view.refresh()},loadView:function(a){t.globals.view=a,$("#exhibit").empty(),$("#school-view").hide(),t.view=new e[a](t.data)}},window.app=t,e={},e.Bars=function(t){var e,l=this;this.$el=$("#exhibit"),this.data=_.sortBy(t,function(t){return-(t.selected[n].fullBudget/t.enrollment[n].total)}),this.table=d3.select("#exhibit").append("table").attr("class","bar-chart").attr("summary","Schools by the funding per student"),e=this.table.append("thead").append("tr"),e.append("th").attr("scope","col").attr("data-sort","name").text("School Name").append("span").attr("class","sort-arrow"),e.append("th").attr("scope","col").attr("data-sort","enrollment").attr("class","descending").text("Enrollment").append("span").attr("class","sort-arrow"),e.append("th").attr("scope","col").attr("data-sort","budget").attr("class","selected descending").text("Funds per Student").append("span").attr("class","sort-arrow"),e.append("th").attr("scope","col").attr("data-sort","change").attr("class","descending").text("Change").append("span").attr("class","sort-arrow"),$("table.bar-chart th").click(function(){var t,e=$(this),a=e.data("sort");e.hasClass("selected")&&"name"!==a?e.toggleClass("descending"):($("table.bar-chart th").removeClass("selected"),e.addClass("selected")),t=e.hasClass("descending"),l.refresh(function(e){var l;switch(a){case"budget":l=e.selected[n].total/e.enrollment[n].total;break;case"enrollment":l=e.enrollment[n].total;break;default:l=e[a]}return t?-l:l})}),this.tbody=this.table.append("tbody"),this.removeSchoolViews=function(t){$(".bar-chart .school-view").slideUp({duration:t?0:400,complete:function(){$(this).parent().parent().remove()}})},this.sort=function(t){return-(t.selected[n].total/t.enrollment[n].total)},this.click=function(t){if(l.removeSchoolViews(),t.code&&t.code!==l.expandedRow){l.expandedRow=t.code;var e=$("<tr>").addClass("school-view-row"+($(this).hasClass("odd")?" odd":"")),n=$("<td>").attr("colspan",4).appendTo(e),s=$("#school-view").clone().removeAttr("id");a(d3.select(s[0]),t),s.find("button.close").click(function(){l.expandedRow=null,l.removeSchoolViews()}),s.appendTo(n),$(this).after(e),s.slideDown()}else l.expandedRow=null},this.refresh()},e.Bars.prototype.resize=function(){},e.Bars.prototype.refresh=function(t){this.removeSchoolViews(!0),this.sort=t||this.sort;var e=this.data[0],a=e.selected[n].fullBudget/e.enrollment[n].total,l=this.tbody.selectAll("tr.bar").data(_.sortBy(this.data,this.sort)),s=_.template('<td><%= name %></td><td><%= enrollment[CURRENT_YEAR].total %></td><td><div class="wrapper"><div class="bar"><span class="year"><%= CURRENT_YEAR + ": " %></span><span class="label"><%= "$" + commasFormatter(selected[CURRENT_YEAR].total / enrollment[CURRENT_YEAR].total) %></span><% _.each(selected[CURRENT_YEAR].lines, function (line) { %><span class="rect <%= line.category %>" style="width: <%= (line.value / enrollment[CURRENT_YEAR].total) / max * 100 %>%;"></span><% }); %></div><div class="bar previous-year"><span class="year"><%= CURRENT_YEAR - 1 + ": " %></span><span class="label"><%= "$" + commasFormatter(selected[CURRENT_YEAR - 1].total / enrollment[CURRENT_YEAR - 1].total) %></span><% _.each(selected[CURRENT_YEAR - 1].lines, function (line) { %><span class="rect <%= line.category %>" style="width: <%= (line.value / enrollment[CURRENT_YEAR - 1].total) / max * 100 %>%;"></span><% }); %></div></div></td><td class="<%= change < 0 ? "negative" : "" %>"><%= (change * 100).toFixed(1) + "%" %></td>',{imports:{commasFormatter:i,CURRENT_YEAR:n,max:a}}),r=0;l.enter().append("tr").on("click",this.click),l.attr("class",function(t){return"bar school-"+t.code}).html(function(t){return s(t)}),l.classed("filtered",function(t){return t.filtered}).classed("odd",function(t){return t.filtered||(r+=1),r%2===1}),l.exit().remove()},e.Lines=function(t){var e=this,l={es:"Elementary",ms:"Middle",hs:"High",campus:"Education Campus"};this.margin={top:6,right:2,bottom:38,left:42},this.data=d3.nest().key(function(t){return t.level}).entries(_.reject(t,{level:null})),this.data=_.sortBy(this.data,function(t){return _.indexOf(["es","ms","hs","campus"],t.key)}),this.$el=$("#exhibit"),this.y=d3.scale.linear(),this.multiples=d3.select("#exhibit").selectAll(".multiple").data(this.data).enter().append("div").attr("class",function(t){return"multiple "+t.key}),this.multiples.append("span").attr("class","title").text(function(t){return l[t.key]}),this.svg=this.multiples.append("svg").attr("class","slopegraph chart"),this.g=this.svg.append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")"),this.fg=this.g.append("g"),this.bg=this.g.append("g"),this.interactionLayer=this.g.append("g"),this.mouseover=function(t){e.fg.select(".line.school-"+t.code).classed("highlighted",!0);var a=d3.select("#tooltip");a.selectAll(".field.schoolname").text(t.name),a.selectAll(".field.current-total").text("$"+i(t.selected[n].total/t.enrollment[n].total)),a.selectAll(".field.previous-total").text("$"+i(t.selected[n-1].total/t.enrollment[n-1].total)),a.style("display","block")},this.mouseout=function(t){e.fg.select(".line.school-"+t.code).classed("highlighted",!1),d3.select("#tooltip").style("display","none")},this.click=function(t){a(d3.select("#school-view"),t),$("#school-view").slideDown(),$("#school-view button.close").click(function(){$("#school-view").slideUp()})},$("svg.slopegraph.chart").on("mousemove",function(t){var a,l=t.pageX;e.pageWidth&&e.pageWidth<l+396?(a=l+409-e.pageWidth,$("#tooltip .arrow").css("left",a>370?370:a),$("#tooltip").css({left:"",right:0})):(a=l-42,$("#tooltip .arrow").css("left",15),$("#tooltip").css({left:a,right:""}))}),this.resize()},e.Lines.prototype.resize=function(){this.width=this.$el.children().first().width()-this.margin.left-this.margin.right,this.height=400-this.margin.top-this.margin.bottom,this.pageWidth=this.$el.width(),this.svg.attr("width",this.width+this.margin.left+this.margin.right).attr("height",this.height+this.margin.top+this.margin.bottom),this.y.range([this.height,0]),this.refresh()},e.Lines.prototype.refresh=function(){var t,e,a,l,s=_.reduce(_(this.data).values().pluck("values").flatten().value(),function(t,e){var a=Math.max(e.selected[n].total/e.enrollment[n].total,e.selected[n-1].total/e.enrollment[n-1].total);return a>t?2e3*Math.ceil(a/2e3):t},0),r=this;this.y.domain([0,s]),t=d3.svg.axis().scale(this.y).orient("left").tickSize(0).tickValues([0,s/2,s]).tickFormat(function(t){return"$"+i(t/1e3)+"K"}),e=d3.svg.axis().scale(this.y).orient("right").tickSize(0).tickFormat(""),this.bg.selectAll(".axis").remove(),this.bg.append("g").attr("class","axis").call(t),this.bg.append("g").attr("class","axis").attr("transform","translate("+this.width+",0)").call(e),this.bg.selectAll(".tick text").style("text-anchor","middle").attr("x",-(this.margin.left+this.margin.right)/2),a=this.fg.selectAll(".line").data(function(t){return t.values}),a.enter().append("line").attr("class",function(t){return"line school-"+t.code}).attr("x1",0).attr("x2",this.width),a.classed("filtered",function(t){return t.filtered}),a.transition().duration(400).attr("y1",function(t){return r.y(t.selected[n-1].total/t.enrollment[n-1].total)}).attr("y2",function(t){return r.y(t.selected[n].total/t.enrollment[n].total)}),l=this.interactionLayer.selectAll(".interaction-line").data(function(t){return _.reject(t.values,"filtered")}),l.enter().append("line").attr("class","interaction-line").attr("x1",0).attr("x2",this.width).on("mouseover",this.mouseover).on("mouseout",this.mouseout).on("click",this.click),l.attr("y1",function(t){return r.y(t.selected[n-1].total/t.enrollment[n-1].total)}).attr("y2",function(t){return r.y(t.selected[n].total/t.enrollment[n].total)}),l.exit().remove()},a=function(t,e){var a=t.selectAll("ul.field.budgetlines"),l=t.selectAll("div.chart"),r=e.enrollment[n].atRisk/e.enrollment[n].total,o=35,c=d3.layout.pie().sort(null),d=d3.svg.arc().innerRadius(o-8).outerRadius(o);t.selectAll(".field.schoolname").text(e.name),t.selectAll(".field.atriskcount").text(e.enrollment[n].atRisk),t.selectAll(".field.enrollment").text(e.enrollment[n].total),t.selectAll("a.learndc").attr("href","http://learndc.org/schoolprofiles/view?s="+e.code+"#overview"),a.selectAll("li").remove(),_.forEach({current:n,previous:n-1},function(a,l){var n=t.selectAll("ul.field.budgetlines."+l+"-year"),r=e.budget[a];_.each(r,function(t){n.append("li").html('<span class="amount">$'+i(t.value/e.enrollment[a].total)+"</span> "+s[t.category])})}),l.selectAll("svg").remove(),l=l.append("svg").attr("width","70px").attr("height","70px").append("g"),l.attr("transform","translate("+o+","+o+")").selectAll(".arc").data(c([0,1])).enter().append("path").attr("class","arc").attr("d",function(t){return this._current=t,d(t)}).data(c([r,1-r])).transition().duration(1e3*r).attrTween("d",function(t){var e=d3.interpolate(this._current,t);return function(t){return d(e(t))}}),l.append("text").attr("class","amount").attr("y",5).style("text-anchor","middle").text("0%").transition().duration(1e3*r).tween("text",function(){var t=function(t){return(r*t*100).toFixed(0)+"%"};return function(e){this.textContent=t(e)}})}}();