/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerTypeDialogComponent } from '../../../../../../main/webapp/app/entities/banner-type/banner-type-dialog.component';
import { BannerTypeService } from '../../../../../../main/webapp/app/entities/banner-type/banner-type.service';
import { BannerType } from '../../../../../../main/webapp/app/entities/banner-type/banner-type.model';

describe('Component Tests', () => {

    describe('BannerType Management Dialog Component', () => {
        let comp: BannerTypeDialogComponent;
        let fixture: ComponentFixture<BannerTypeDialogComponent>;
        let service: BannerTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerTypeDialogComponent],
                providers: [
                    BannerTypeService
                ]
            })
            .overrideTemplate(BannerTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bannerType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerType();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bannerType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
