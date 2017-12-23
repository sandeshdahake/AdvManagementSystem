/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerLocationAmsDialogComponent } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams-dialog.component';
import { BannerLocationAmsService } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams.service';
import { BannerLocationAms } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams.model';

describe('Component Tests', () => {

    describe('BannerLocationAms Management Dialog Component', () => {
        let comp: BannerLocationAmsDialogComponent;
        let fixture: ComponentFixture<BannerLocationAmsDialogComponent>;
        let service: BannerLocationAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerLocationAmsDialogComponent],
                providers: [
                    BannerLocationAmsService
                ]
            })
            .overrideTemplate(BannerLocationAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerLocationAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerLocationAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerLocationAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bannerLocation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerLocationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerLocationAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bannerLocation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerLocationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
