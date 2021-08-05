import 'jquery';

export class Draggable {
    draggableElement: JQuery;

    minX = 20;
    minY = 20;
    clientX = 0; clientY = 0; elementX = 0; elementY = 0; 

    constructor(element: string) {
        this.draggableElement = $(element);

        this.init();
    }

    private init() {
        this.draggableElement.addClass('draggable');
        this.draggableElement.css('cursor', 'move');
        this.draggableElement.on('mouseup', (e) => {
            e.preventDefault();
            this.draggableElement.off('mousemove');
        });

        this.draggableElement.on('mousedown', (e) => {
            e.preventDefault();
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.elementX = (this.draggableElement.offset() as JQueryCoordinates).left;
            this.elementY = (this.draggableElement.offset() as JQueryCoordinates).top;
            this.draggableElement.on('mousemove', (e) => {
                const dx = e.clientX - this.clientX;
                const dy = e.clientY - this.clientY;

                this.draggableElement.offset({left: this.elementX + dx ,top: this.elementY + dy});
            });
        });
    }
}