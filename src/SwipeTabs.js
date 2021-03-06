//Ext.ns('Ext.ux.touch');
/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.touch.SwipeTabs
 * <p>A plugin that lets the user swipe between tabs in a TabPanel. No configuration is needed.</p>
 * <p>Sample Usage</p>
 * <pre><code>
 {
     xtype: 'tabpanel',
     ...,
     plugins: [new Ext.ux.touch.SwipeTabs()],
     ...
 }
 * </code></pre>
 */
Ext.define('Ext.ux.touch.SwipeTabs', {
    alias: 'plugin.swipetabs',

    config : {
        // @private
        cmp           : null,

        /**
         * @cfg {Boolean} [allowOverflow=true] Allow swipe to go to the beginning or end
         * @accessor
         */
        allowOverflow : true,

        /**
         * @cfg {Object} [animation={type : "slide"}] Animation object to use. Direction will be set on this animation.
         * @private
         * @accessor
         */
        animation     : {
            type : 'slide'
        },
        
        /**
         * @cfg {Object} [allowDirections=['left', 'right', 'up', 'down',]] Allow swipe only in certain directions.
         * @private
         * @accessor
         */
        allowDirections : [
            'left',
            'right',
            'up',
            'down'
        ]
    },

    constructor : function(config) {
        this.initConfig(config);

        this.callParent([config]);
    },

    init : function(cmp) {
        this.setCmp(cmp);
    },

    updateCmp : function(newCmp, oldCmp) {
        if (oldCmp) {
            oldCmp.element.un('swipe', this.onSwipe);
        }

        if (newCmp) {
            newCmp.element.on('swipe', this.onSwipe, this);
        }
    },

    onSwipe : function(e) {
        if (this.getAllowDirections().indexOf(e.direction) < 0) {
            return;
        }
        
        var cmp           = this.getCmp(),
            allowOverflow = this.getAllowOverflow(),
            animation     = this.getAnimation(),
            direction     = e.direction,
            activeItem    = cmp.getActiveItem(),
            innerItems    = cmp.getInnerItems(),
            numIdx        = innerItems.length - 1,
            idx           = Ext.Array.indexOf(innerItems, activeItem),
            newIdx        = idx + (direction === 'left' ? 1 : -1),
            newItem;

        if (newIdx < 0) {
            if (allowOverflow) {
                newItem = innerItems[numIdx];
            }
        } else if (newIdx > numIdx) {
            if (allowOverflow) {
                newItem = innerItems[0];
            }
        } else {
            newItem = innerItems[newIdx];
        }
        var default_anim=cmp.getLayout().getAnimation();
        if (newItem) {
         //if the defaultAnimation is null execute the setActiveItem to change the view
        	if(typeof default_anim.disable==='function'){
	            animation = Ext.apply({}, {
	                direction : direction
	            }, animation);
	            cmp.animateActiveItem(newItem,animation);
        	}else{
        		cmp.setActiveItem(newItem);
        	}  
        }
    }

});
