import "jquery";
import './resizable.css';
export class Resizable {
    public minX = 20;
    public minY = 20;
    public minWidth = 10;
    public minHeight = 10;
    doc = $(document);
    resizableElement: JQuery;
    // current position of mouse
    clientX = 0;
    clientY = 0;

    // dimension of element
    w = 0;
    h = 0;

    constructor(element: string) {
        this.resizableElement = $(element);
        // const d = $(document);
        // d.on('mousemove', (e)=>{
        //     alert("QQ");
        // })
        this.init();
    }

    private init() {
        this.resizableElement.addClass('resizable');

        $('<div class="resizer resize-r" />').appendTo(this.resizableElement);
        $('<div class="resizer resize-b" />').appendTo(this.resizableElement);
        $('<div class="resizer resize-rb" />').appendTo(this.resizableElement);
        $('<div class="resizer resize-l" />').appendTo(this.resizableElement);
        $('<div class="resizer resize-t" />').appendTo(this.resizableElement);
        $('<div class="resizer resize-lt" />').appendTo(this.resizableElement);

        this.bindResizeMouseUp();

        this.bindMouseDown();
    }

    private bindResizeMouseUp() {
        const that = this;
        $(this.resizableElement).find('.resizer').on('mouseup', function(e){
            e.preventDefault();
            e.stopPropagation();
            that.doc.off('mousemove');
            that.doc.off('mousedown');
        });
    }
    

    private resizeRBDownHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        this.resizeRightDownHandler(e);
        this.resizeBottomDownHandler(e);
    };

    private resizeRightMoveHandler: any = (e: MouseEvent) => {
        e.preventDefault();                
        const dx = e.clientX - this.clientX                            
        let new_width = this.w + dx;
        this.resizableElement.width(new_width > this.minWidth ? new_width : this.minWidth);
    };

    private resizeRightDownHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // mouse X of document
        this.clientX = e.clientX;
        this.w = this.resizableElement.width() as number;
        
        this.doc.on('mousemove', this.resizeRightMoveHandler);
    };

    private resizeBottomMoveHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        const dy = e.clientY - this.clientY;                            
        let new_height = this.h + dy;
        if(new_height > this.minHeight) {
            this.resizableElement.height(new_height);
        }
    };

    private resizeBottomDownHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // mouse Y of document
        this.clientY = e.clientY;
        this.h = this.resizableElement.height() as number;
        this.doc.on('mousemove', this.resizeBottomMoveHandler);
    };

    // ========

    private resizeLTDownHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.resizeLeftDownHandler(e);
        this.resizeTopDownHandler(e);
    };

    private resizeLeftMoveHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        if(e.clientX <= this.minX) return;
        const dx = e.clientX - this.clientX
        let new_width = this.w - dx;
        if(new_width > this.minWidth) {
            this.resizableElement.width(new_width);
            this.resizableElement.offset({left: e.clientX});
        } else {
            this.resizableElement.width(this.minWidth);
        }
    };

    private resizeLeftDownHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // mouse X of document
        this.clientX = e.clientX;
        this.w = this.resizableElement.width() as number;            
        this.doc.on('mousemove', this.resizeLeftMoveHandler);
    };

    private resizeTopMoveHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        if(e.clientY <= this.minY) return;
        const dy = e.clientY - this.clientY;                            
        let new_height = this.h - dy;
        if(new_height > this.minHeight) {
            this.resizableElement.height(new_height);
            this.resizableElement.offset({top: e.clientY});
        }
    };

    private resizeTopDownHandler: any = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // mouse Y of document
        this.clientY = e.clientY;
        this.h = this.resizableElement.height() as number;
        this.doc.on('mousemove', this.resizeTopMoveHandler);
    };

    private bindMouseDown() {
        // =====

        this.resizableElement.on('mousedown', '.resize-r', this.resizeRightDownHandler);
        this.resizableElement.on('mousedown', '.resize-b', this.resizeBottomDownHandler);
        this.resizableElement.on('mousedown', '.resize-rb', this.resizeRBDownHandler);

        // ======

        this.resizableElement.on('mousedown', '.resize-l', this.resizeLeftDownHandler);
        this.resizableElement.on('mousedown', '.resize-t', this.resizeTopDownHandler);
        this.resizableElement.on('mousedown', '.resize-lt', this.resizeLTDownHandler);
    }
    

}

