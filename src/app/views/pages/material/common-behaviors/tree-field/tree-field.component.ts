import { TreeSettings } from '../../../../../shared/_constant/tree-setting';
import { Component, OnInit } from '@angular/core';
import { TreeService,LoadmoreFlatNode,LoadmoreNode } from '../../../../../core/material-services/tree/tree.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'kt-tree',
  templateUrl: './tree-field.component.html',
  styleUrls: ['./tree-field.component.scss'],
  providers: [TreeService]

})
export class TreeFieldComponent implements OnInit {

  nodeMap = new Map<string, LoadmoreFlatNode>();
  treeControl: FlatTreeControl<LoadmoreFlatNode>;
  treeFlattener: MatTreeFlattener<LoadmoreNode, LoadmoreFlatNode>;
  // Flat tree data source
  dataSource: MatTreeFlatDataSource<LoadmoreNode, LoadmoreFlatNode>;

  constructor(private database: TreeService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl<LoadmoreFlatNode>(this.getLevel, this.isExpandable);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

    database.initialize();
  }

  getChildren = (node: LoadmoreNode): Observable<LoadmoreNode[]> => node.childrenChange;

  transformer = (node: LoadmoreNode, level: number) => {
    const existingNode = this.nodeMap.get(node.item);

    if (existingNode) {
      return existingNode;
    }

    const newNode = new LoadmoreFlatNode(node.item, level, node.hasChildren, node.loadMoreParentItem);
    this.nodeMap.set(node.item, newNode);
    return newNode;
  }

  getLevel = (node: LoadmoreFlatNode) => node.level;

  isExpandable = (node: LoadmoreFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: LoadmoreFlatNode) => _nodeData.expandable;

  isLoadMore = (_: number, _nodeData: LoadmoreFlatNode) => _nodeData.item === TreeSettings.LOAD_MORE;

  /** Load more nodes from data source */
  loadMore(item: string) {
    this.database.loadMore(item);
  }

  loadChildren(node: LoadmoreFlatNode) {
    this.database.loadMore(node.item, true);
  }

  ngOnInit() {
  }

}
