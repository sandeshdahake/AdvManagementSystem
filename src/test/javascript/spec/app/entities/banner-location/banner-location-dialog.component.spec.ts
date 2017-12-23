/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerLocationDialogComponent } from '../../../../../../main/webapp/app/entities/banner-location/banner-location-dialog.component';
import { BannerLocationService } from '../../../../../../main/webapp/app/entities/banner-location/banner-location.service';
import { BannerLocation } from '../../../../../../main/webapp/app/entities/banner-location/banner-location.model';

describe('Component Tests', () => {

    describe('BannerLocation Management Dialog Component', () => {
        let comp: BannerLocationDialogComponent;
        let fixture: ComponentFixture<BannerLocationDialogComponent>;
        let service: BannerLocationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerLocationDialogComponent],
                providers: [
                    BannerLocationService
                ]
            })
            .overrideTemplate(BannerLocationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerLocationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerLocationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerLocation(123);
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
                        const entity = new BannerLocation();
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
