import { Component, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { DynamicComponent } from './../interfaces/dynamic-component.interface';
import { TargetDirective } from './../directives/target.directive';
import { Component1Component } from './../component-1/component-1.component';
import { Component2Component } from './../component-2/component-2.component';

@Component({
  selector: 'app-dynamic-component-loading',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements AfterViewInit {
  // Получить экземпляр директивы
  @ViewChild(TargetDirective) target: TargetDirective;

  currentComponent: any = Component1Component;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    // Если передаются какие-то данные компоненту или вызываются его методы,
    // то необходимо, чтобы этот компонент создавался на следующим цикле обнаружения изменений,
    // иначе будет Error: ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.loadComponent(this.currentComponent);
    });
  }

  switchView() {
    if (this.currentComponent.name === 'Component1Component') {
      this.currentComponent = Component2Component;
    } else {
      this.currentComponent = Component1Component;
    }
    this.loadComponent(this.currentComponent);
  }

  private loadComponent(component) {
    // Создать componentFactory используя componentFactoryResolver класс
    const componentFactory =
          this.componentFactoryResolver.resolveComponentFactory(component);


    // Получить место, куда необходимо добавлять компонент и очистить его
    // Используем для этого директиву target
    // Директива инжектит через свой конструктор viewContainerRef как публичное свойство,
    // Мы его тут используем
    const viewContainerRef = this.target.viewContainerRef;
    viewContainerRef.clear();

    // Добавить компонент в темплейт
    // Метод createComponent() возвращает ссылку надинамически загруженый компонент.
    // Эту ссылку можно использовать для взаимодействия с компонентом,
    // например, для присвоения каких-то значений его свойствам или для вызова его методов.
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // Передать данные компоненту
    (<DynamicComponent>componentRef.instance).data = 'Data for Component';

    // Вызвать метод компонента
    (<DynamicComponent>componentRef.instance).notify();
  }

}
