/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerSizeAmsDialogComponent } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams-dialog.component';
import { BannerSizeAmsService } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.service';
import { BannerSizeAms } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.model';

describe('Component Tests', () => {

    describe('BannerSizeAms Management Dialog Component', () => {
        let comp: BannerSizeAmsDialogComponent;
        let fixture: ComponentFixture<BannerSizeAmsDialogComponent>;
        let service: BannerSizeAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerSizeAmsDialogComponent],
                providers: [
                    BannerSizeAmsService
                ]
            })
            .overrideTemplate(BannerSizeAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerSizeAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerSizeAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerSizeAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bannerSize = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerSizeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerSizeAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bannerSize = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerSizeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
