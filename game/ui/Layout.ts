import Phaser from "phaser";

export class Layout {
  /**
   * Stack elements vertically with spacing
   */
  static stackVertical(
    container: Phaser.GameObjects.Container,
    elements: Phaser.GameObjects.GameObject[],
    startY: number,
    spacing: number
  ) {
    let currentY = startY;
    
    elements.forEach((element) => {
      if (element instanceof Phaser.GameObjects.Container) {
        element.y = currentY;
        currentY += element.height + spacing;
      } else if (element instanceof Phaser.GameObjects.Text) {
        element.y = currentY;
        currentY += element.height + spacing;
      } else if (element instanceof Phaser.GameObjects.GameObject) {
        (element as any).y = currentY;
        const height = (element as any).height || 0;
        currentY += height + spacing;
      }
    });
  }
  
  /**
   * Stack elements horizontally with spacing
   */
  static stackHorizontal(
    container: Phaser.GameObjects.Container,
    elements: Phaser.GameObjects.GameObject[],
    startX: number,
    spacing: number
  ) {
    let currentX = startX;
    
    elements.forEach((element) => {
      if (element instanceof Phaser.GameObjects.Container) {
        element.x = currentX;
        currentX += element.width + spacing;
      } else if (element instanceof Phaser.GameObjects.Text) {
        element.x = currentX;
        currentX += element.width + spacing;
      } else if (element instanceof Phaser.GameObjects.GameObject) {
        (element as any).x = currentX;
        const width = (element as any).width || 0;
        currentX += width + spacing;
      }
    });
  }
  
  /**
   * Center element in container
   */
  static center(
    element: Phaser.GameObjects.GameObject,
    containerWidth: number,
    containerHeight: number
  ) {
    if (element instanceof Phaser.GameObjects.Container) {
      element.x = containerWidth / 2;
      element.y = containerHeight / 2;
    } else if (element instanceof Phaser.GameObjects.Text) {
      element.x = containerWidth / 2;
      element.y = containerHeight / 2;
      element.setOrigin(0.5);
    } else {
      (element as any).x = containerWidth / 2;
      (element as any).y = containerHeight / 2;
    }
  }
  
  /**
   * Align elements in grid
   */
  static grid(
    container: Phaser.GameObjects.Container,
    elements: Phaser.GameObjects.GameObject[],
    columns: number,
    startX: number,
    startY: number,
    spacingX: number,
    spacingY: number
  ) {
    elements.forEach((element, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;
      
      if (element instanceof Phaser.GameObjects.Container) {
        element.x = x;
        element.y = y;
      } else {
        (element as any).x = x;
        (element as any).y = y;
      }
    });
  }
}
